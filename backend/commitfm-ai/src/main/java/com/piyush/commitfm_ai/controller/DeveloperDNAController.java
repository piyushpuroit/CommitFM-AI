package com.piyush.commitfm_ai.controller;

import com.piyush.commitfm_ai.dto.AnalysisResultDto;
import com.piyush.commitfm_ai.dto.DeveloperDNADto;
import com.piyush.commitfm_ai.service.AnalysisEngineService;
import com.piyush.commitfm_ai.service.DeveloperDNAService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${frontend.url:http://localhost:5173}", allowCredentials = "true")
public class DeveloperDNAController {

    private final AnalysisEngineService analysisEngineService;
    private final DeveloperDNAService developerDNAService;

    public DeveloperDNAController(AnalysisEngineService analysisEngineService, DeveloperDNAService developerDNAService) {
        this.analysisEngineService = analysisEngineService;
        this.developerDNAService = developerDNAService;
    }

    @GetMapping("/analysis/{owner}/{repo}/developer-dna")
    public ResponseEntity<DeveloperDNADto> getDeveloperDNA(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            HttpSession session) {
        String accessToken = (String) session.getAttribute("accessToken");
        if (accessToken == null || accessToken.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Try getting cached analysis first to prevent duplicate API requests
        AnalysisResultDto analysis = analysisEngineService.getCachedAnalysis(owner, repo);
        if (analysis == null) {
            // Fallback: trigger fresh analysis if not cached
            analysis = analysisEngineService.analyzeRepository(accessToken, owner, repo);
        }

        if (analysis == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        DeveloperDNADto dna = developerDNAService.calculateDeveloperDNA(analysis);
        return ResponseEntity.ok(dna);
    }
}
