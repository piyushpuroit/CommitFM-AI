package com.piyush.commitfm_ai.service;

import com.piyush.commitfm_ai.dto.GitHubRepositoryDto;
import com.piyush.commitfm_ai.dto.GitHubRepositoryDetailsDto;
import com.piyush.commitfm_ai.dto.CommitDto;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class GitHubService {

    private final RestTemplate restTemplate;

    public GitHubService() {
        this.restTemplate = new RestTemplate();
    }

    public List<GitHubRepositoryDto> getRepositories(String accessToken) {
        if (accessToken == null || accessToken.trim().isEmpty()) {
            return Collections.emptyList();
        }

        String url = "https://api.github.com/user/repos?per_page=100&sort=updated";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Accept", "application/json");

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        try {
            ResponseEntity<GitHubRepositoryDto[]> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    requestEntity,
                    GitHubRepositoryDto[].class
            );

            if (response.getBody() != null) {
                return Arrays.asList(response.getBody());
            }
        } catch (Exception e) {
            System.err.println("Error fetching repositories from GitHub: " + e.getMessage());
        }

        return Collections.emptyList();
    }

    public GitHubRepositoryDetailsDto getRepositoryDetails(String accessToken, String owner, String repo) {
        if (accessToken == null || accessToken.trim().isEmpty()) {
            return null;
        }

        String url = "https://api.github.com/repos/" + owner + "/" + repo;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Accept", "application/json");

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        try {
            ResponseEntity<GitHubRepositoryDetailsDto> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    requestEntity,
                    GitHubRepositoryDetailsDto.class
            );

            return response.getBody();
        } catch (Exception e) {
            System.err.println("Error fetching repository details for " + owner + "/" + repo + " from GitHub: " + e.getMessage());
        }

        return null;
    }

    @SuppressWarnings("unchecked")
    public List<CommitDto> getRepositoryCommits(String accessToken, String owner, String repo) {
        if (accessToken == null || accessToken.trim().isEmpty()) {
            return Collections.emptyList();
        }

        String url = "https://api.github.com/repos/" + owner + "/" + repo + "/commits?per_page=100";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Accept", "application/json");

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        try {
            ResponseEntity<List> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    requestEntity,
                    List.class
            );

            if (response.getBody() != null) {
                List<Map<String, Object>> rawCommits = response.getBody();
                List<CommitDto> commits = new java.util.ArrayList<>();
                for (Map<String, Object> raw : rawCommits) {
                    String sha = (String) raw.get("sha");
                    String htmlUrl = (String) raw.get("html_url");

                    Map<String, Object> commitObj = (Map<String, Object>) raw.get("commit");
                    String message = "";
                    String date = "";
                    String authorEmail = "";
                    String authorName = "";
                    if (commitObj != null) {
                        message = (String) commitObj.get("message");
                        Map<String, Object> commitAuthor = (Map<String, Object>) commitObj.get("author");
                        if (commitAuthor != null) {
                            date = (String) commitAuthor.get("date");
                            authorName = (String) commitAuthor.get("name");
                            authorEmail = (String) commitAuthor.get("email");
                        }
                    }

                    Map<String, Object> authorObj = (Map<String, Object>) raw.get("author");
                    String authorAvatar = "";
                    if (authorObj != null) {
                        authorName = (String) authorObj.get("login");
                        authorAvatar = (String) authorObj.get("avatar_url");
                    }

                    commits.add(new CommitDto(sha, message, authorName, authorAvatar, authorEmail, date, htmlUrl));
                }
                return commits;
            }
        } catch (HttpStatusCodeException e) {
            HttpStatusCode status = e.getStatusCode();
            if (status.value() == 401) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "GitHub Unauthorized", e);
            } else if (status.value() == 403) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "GitHub Forbidden (Rate Limit)", e);
            } else if (status.value() == 404) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "GitHub Repository Not Found", e);
            } else if (status.value() == 429) {
                throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "GitHub Rate Limit Exceeded", e);
            }
            throw new ResponseStatusException(status, "GitHub Error: " + e.getMessage(), e);
        } catch (Exception e) {
            System.err.println("Error fetching commits for " + owner + "/" + repo + " from GitHub: " + e.getMessage());
        }

        return Collections.emptyList();
    }
}
