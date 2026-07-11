package com.piyush.commitfm_ai.service;

import com.piyush.commitfm_ai.dto.GitHubRepositoryDto;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;

@Service
public class GitHubService {

    public List<GitHubRepositoryDto> getMockRepositories() {
        GitHubRepositoryDto repo1 = new GitHubRepositoryDto(
                101L,
                "commitfm-ai",
                "TypeScript",
                342,
                48,
                Instant.now().toString()
        );

        GitHubRepositoryDto repo2 = new GitHubRepositoryDto(
                102L,
                "telemetry-engine",
                "Go",
                89,
                12,
                Instant.now().minusSeconds(86400).toString()
        );

        GitHubRepositoryDto repo3 = new GitHubRepositoryDto(
                103L,
                "metrics-dashboard",
                "JavaScript",
                124,
                25,
                Instant.now().minusSeconds(172800).toString()
        );

        GitHubRepositoryDto repo4 = new GitHubRepositoryDto(
                104L,
                "git-scraper",
                "Python",
                56,
                8,
                Instant.now().minusSeconds(259200).toString()
        );

        GitHubRepositoryDto repo5 = new GitHubRepositoryDto(
                105L,
                "diagnostic-suite",
                "Rust",
                210,
                38,
                Instant.now().minusSeconds(345600).toString()
        );

        return Arrays.asList(repo1, repo2, repo3, repo4, repo5);
    }
}
