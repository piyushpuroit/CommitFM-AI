package com.piyush.commitfm_ai.controller;

import com.piyush.commitfm_ai.dto.AnalysisResultDto;
import com.piyush.commitfm_ai.service.AnalysisEngineService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${frontend.url:http://localhost:5173}", allowCredentials = "true")
public class AnalysisController {

    private final AnalysisEngineService analysisService;

    public AnalysisController(AnalysisEngineService analysisService) {
        this.analysisService = analysisService;
    }

    @GetMapping("/analysis/{owner}/{repo}")
    public ResponseEntity<AnalysisResultDto> getAnalysis(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            HttpSession session) {
        String accessToken = (String) session.getAttribute("accessToken");
        if (accessToken == null || accessToken.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        AnalysisResultDto result = analysisService.analyzeRepository(accessToken, owner, repo);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }
}
