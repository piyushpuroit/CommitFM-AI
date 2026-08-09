package com.piyush.commitfm_ai.controller;

import com.piyush.commitfm_ai.dto.GitHubRepositoryDto;
import com.piyush.commitfm_ai.dto.GitHubRepositoryDetailsDto;
import com.piyush.commitfm_ai.dto.CommitDto;
import com.piyush.commitfm_ai.dto.TelemetryDto;
import com.piyush.commitfm_ai.service.GitHubService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${frontend.url:http://localhost:5173}", allowCredentials = "true")
public class GitHubController {

    private final GitHubService githubService;

    public GitHubController(GitHubService githubService) {
        this.githubService = githubService;
    }

    @GetMapping("/github/repositories")
    public ResponseEntity<List<GitHubRepositoryDto>> getRepositories(HttpSession session) {
        String accessToken = (String) session.getAttribute("accessToken");
        if (accessToken == null || accessToken.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<GitHubRepositoryDto> repos = githubService.getRepositories(accessToken);
        return ResponseEntity.ok(repos);
    }

    @GetMapping("/github/repositories/{owner}/{repo}")
    public ResponseEntity<GitHubRepositoryDetailsDto> getRepositoryDetails(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            HttpSession session) {
        String accessToken = (String) session.getAttribute("accessToken");
        if (accessToken == null || accessToken.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        GitHubRepositoryDetailsDto details = githubService.getRepositoryDetails(accessToken, owner, repo);
        if (details == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(details);
    }

    @GetMapping("/github/repositories/{owner}/{repo}/commits")
    public ResponseEntity<List<CommitDto>> getRepositoryCommits(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            HttpSession session) {
        String accessToken = (String) session.getAttribute("accessToken");
        if (accessToken == null || accessToken.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<CommitDto> commits = githubService.getRepositoryCommits(accessToken, owner, repo);
        return ResponseEntity.ok(commits);
    }

    @GetMapping("/github/repositories/{owner}/{repo}/telemetry")
    public ResponseEntity<TelemetryDto> getRepositoryTelemetry(
            @PathVariable("owner") String owner,
            @PathVariable("repo") String repo,
            HttpSession session) {
        String accessToken = (String) session.getAttribute("accessToken");
        if (accessToken == null || accessToken.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        TelemetryDto telemetry = githubService.getRepositoryTelemetry(accessToken, owner, repo);
        return ResponseEntity.ok(telemetry);
    }
}
