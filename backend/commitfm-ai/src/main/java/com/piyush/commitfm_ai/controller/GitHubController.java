package com.piyush.commitfm_ai.controller;

import com.piyush.commitfm_ai.dto.GitHubRepositoryDto;
import com.piyush.commitfm_ai.service.GitHubService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class GitHubController {

    private final GitHubService githubService;

    public GitHubController(GitHubService githubService) {
        this.githubService = githubService;
    }

    @GetMapping("/github/repositories")
    public List<GitHubRepositoryDto> getRepositories() {
        return githubService.getMockRepositories();
    }
}
