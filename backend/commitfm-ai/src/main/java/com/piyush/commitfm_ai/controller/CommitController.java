package com.piyush.commitfm_ai.controller;

import com.piyush.commitfm_ai.dto.CommitDto;
import com.piyush.commitfm_ai.service.CommitService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.piyush.commitfm_ai.dto.AnalysisResultDto;
import com.piyush.commitfm_ai.service.AnalysisEngine;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CommitController {

    private final CommitService commitService;
    private final AnalysisEngine analysisEngine;

    public CommitController(CommitService commitService, AnalysisEngine analysisEngine) {
        this.commitService = commitService;
        this.analysisEngine = analysisEngine;
    }

    @GetMapping("/github/repositories/{repositoryId}/commits")
    public List<CommitDto> getCommits(@PathVariable Long repositoryId) {
        return commitService.getMockCommits(repositoryId);
    }

    @GetMapping("/github/repositories/{repositoryId}/analysis")
    public AnalysisResultDto getAnalysis(@PathVariable Long repositoryId) {
        List<CommitDto> commits = commitService.getMockCommits(repositoryId);
        return analysisEngine.analyzeCommits(commits);
    }
}