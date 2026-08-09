package com.piyush.commitfm_ai.service;

import com.piyush.commitfm_ai.dto.GitHubRepositoryDto;
import com.piyush.commitfm_ai.dto.GitHubRepositoryDetailsDto;
import com.piyush.commitfm_ai.dto.CommitDto;
import com.piyush.commitfm_ai.dto.TelemetryDto;
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

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

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

            GitHubRepositoryDetailsDto details = response.getBody();
            if (details != null) {
                // Fetch languages
                String languagesUrl = "https://api.github.com/repos/" + owner + "/" + repo + "/languages";
                try {
                    ResponseEntity<Map<String, Object>> langResponse = restTemplate.exchange(
                            languagesUrl,
                            HttpMethod.GET,
                            requestEntity,
                            new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {}
                    );
                    if (langResponse.getBody() != null) {
                        Map<String, Object> body = langResponse.getBody();
                        Map<String, Long> langs = new HashMap<>();
                        for (Map.Entry<String, Object> entry : body.entrySet()) {
                            if (entry.getValue() instanceof Number) {
                                langs.put(entry.getKey(), ((Number) entry.getValue()).longValue());
                            }
                        }
                        details.setLanguages(langs);
                    }
                } catch (Exception le) {
                    System.err.println("Error fetching languages for details: " + le.getMessage());
                }
            }

            return details;
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
            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    requestEntity,
                    new org.springframework.core.ParameterizedTypeReference<List<Map<String, Object>>>() {}
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

    @SuppressWarnings("unchecked")
    public TelemetryDto getRepositoryTelemetry(String accessToken, String owner, String repo) {
        if (accessToken == null || accessToken.trim().isEmpty()) {
            return new TelemetryDto();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Accept", "application/json");
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        // 1. Fetch Repository Details
        GitHubRepositoryDetailsDto details = getRepositoryDetails(accessToken, owner, repo);
        int repositoryAge = 0;
        if (details != null && details.getCreatedAt() != null) {
            try {
                Instant created = Instant.parse(details.getCreatedAt());
                repositoryAge = (int) ChronoUnit.DAYS.between(created, Instant.now());
            } catch (Exception e) {
                // Ignore
            }
        }

        // 2. Fetch Languages
        String languagesUrl = "https://api.github.com/repos/" + owner + "/" + repo + "/languages";
        Map<String, Double> languageDistribution = new HashMap<>();
        try {
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    languagesUrl,
                    HttpMethod.GET,
                    requestEntity,
                    new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {}
            );
            if (response.getBody() != null) {
                Map<String, Object> rawLanguagesObj = response.getBody();
                Map<String, Number> rawLanguages = new HashMap<>();
                for (Map.Entry<String, Object> entry : rawLanguagesObj.entrySet()) {
                    if (entry.getValue() instanceof Number) {
                        rawLanguages.put(entry.getKey(), (Number) entry.getValue());
                    }
                }
                double totalBytes = 0;
                for (Number val : rawLanguages.values()) {
                    totalBytes += val.doubleValue();
                }
                if (totalBytes > 0) {
                    for (Map.Entry<String, Number> entry : rawLanguages.entrySet()) {
                        double percentage = (entry.getValue().doubleValue() / totalBytes) * 100.0;
                        percentage = Math.round(percentage * 100.0) / 100.0;
                        languageDistribution.put(entry.getKey(), percentage);
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Error fetching languages: " + e.getMessage());
        }

        // 3. Fetch Commits
        List<CommitDto> commits = getRepositoryCommits(accessToken, owner, repo);
        int totalCommits = commits.size();
        String lastCommitDate = "";
        if (!commits.isEmpty()) {
            lastCommitDate = commits.get(0).getDate();
        }

        int commitsLast7Days = 0;
        int commitsLast30Days = 0;
        Instant now = Instant.now();
        Instant sevenDaysAgo = now.minus(7, ChronoUnit.DAYS);
        Instant thirtyDaysAgo = now.minus(30, ChronoUnit.DAYS);

        Map<LocalDate, Integer> dayCommitCounts = new TreeMap<>();
        Map<Integer, Integer> hourFrequencies = new HashMap<>();
        Map<String, Integer> dayOfWeekFrequencies = new HashMap<>();
        Map<String, Integer> contributorCounts = new HashMap<>();
        int weekendCommits = 0;

        for (CommitDto c : commits) {
            if (c.getDate() != null && !c.getDate().isEmpty()) {
                try {
                    Instant commitTime = Instant.parse(c.getDate());
                    if (commitTime.isAfter(sevenDaysAgo)) {
                        commitsLast7Days++;
                    }
                    if (commitTime.isAfter(thirtyDaysAgo)) {
                        commitsLast30Days++;
                    }

                    ZonedDateTime zdt = commitTime.atZone(java.time.ZoneId.of("UTC"));
                    LocalDate localDate = zdt.toLocalDate();
                    dayCommitCounts.put(localDate, dayCommitCounts.getOrDefault(localDate, 0) + 1);

                    int hour = zdt.getHour();
                    hourFrequencies.put(hour, hourFrequencies.getOrDefault(hour, 0) + 1);

                    String dayOfWeek = zdt.getDayOfWeek().name();
                    dayOfWeekFrequencies.put(dayOfWeek, dayOfWeekFrequencies.getOrDefault(dayOfWeek, 0) + 1);

                    if (zdt.getDayOfWeek() == java.time.DayOfWeek.SATURDAY || zdt.getDayOfWeek() == java.time.DayOfWeek.SUNDAY) {
                        weekendCommits++;
                    }
                } catch (Exception e) {
                    // Ignore
                }
            }

            if (c.getAuthorName() != null && !c.getAuthorName().isEmpty()) {
                contributorCounts.put(c.getAuthorName(), contributorCounts.getOrDefault(c.getAuthorName(), 0) + 1);
            }
        }

        double weekendContributionPercent = totalCommits > 0 
                ? Math.round(((double) weekendCommits / totalCommits) * 10000.0) / 100.0
                : 0.0;

        double averageCommitsPerDay = 0.0;
        if (!dayCommitCounts.isEmpty()) {
            averageCommitsPerDay = Math.round(((double) totalCommits / dayCommitCounts.size()) * 100.0) / 100.0;
        }

        int activeCodingHour = 9;
        int maxHourFreq = -1;
        for (Map.Entry<Integer, Integer> entry : hourFrequencies.entrySet()) {
            if (entry.getValue() > maxHourFreq) {
                maxHourFreq = entry.getValue();
                activeCodingHour = entry.getKey();
            }
        }

        String activeCodingDay = "Monday";
        int maxDayFreq = -1;
        for (Map.Entry<String, Integer> entry : dayOfWeekFrequencies.entrySet()) {
            if (entry.getValue() > maxDayFreq) {
                maxDayFreq = entry.getValue();
                activeCodingDay = entry.getKey();
            }
        }

        int longestCommitStreak = 0;
        int currentStreak = 0;
        if (!dayCommitCounts.isEmpty()) {
            List<LocalDate> sortedDates = new ArrayList<>(dayCommitCounts.keySet());
            Collections.sort(sortedDates);

            int tempStreak = 1;
            longestCommitStreak = 1;
            for (int i = 1; i < sortedDates.size(); i++) {
                if (ChronoUnit.DAYS.between(sortedDates.get(i - 1), sortedDates.get(i)) == 1) {
                    tempStreak++;
                } else {
                    longestCommitStreak = Math.max(longestCommitStreak, tempStreak);
                    tempStreak = 1;
                }
            }
            longestCommitStreak = Math.max(longestCommitStreak, tempStreak);

            LocalDate today = LocalDate.now(java.time.ZoneId.of("UTC"));
            LocalDate yesterday = today.minus(1, ChronoUnit.DAYS);
            if (dayCommitCounts.containsKey(today)) {
                currentStreak = 1;
                LocalDate checkDate = yesterday;
                while (dayCommitCounts.containsKey(checkDate)) {
                    currentStreak++;
                    checkDate = checkDate.minus(1, ChronoUnit.DAYS);
                }
            } else if (dayCommitCounts.containsKey(yesterday)) {
                currentStreak = 1;
                LocalDate checkDate = yesterday.minus(1, ChronoUnit.DAYS);
                while (dayCommitCounts.containsKey(checkDate)) {
                    currentStreak++;
                    checkDate = checkDate.minus(1, ChronoUnit.DAYS);
                }
            }
        }

        Map<String, Integer> topContributors = contributorCounts.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .limit(5)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));

        // Get details of top 5 commits to fetch modified files
        List<String> mostModifiedFiles = new ArrayList<>();
        Map<String, Integer> fileFrequencies = new HashMap<>();
        int countToFetch = Math.min(5, commits.size());
        for (int i = 0; i < countToFetch; i++) {
            String sha = commits.get(i).getSha();
            String commitDetailUrl = "https://api.github.com/repos/" + owner + "/" + repo + "/commits/" + sha;
            try {
                ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                        commitDetailUrl,
                        HttpMethod.GET,
                        requestEntity,
                        new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {}
                );
                if (response.getBody() != null) {
                    List<Map<String, Object>> files = (List<Map<String, Object>>) response.getBody().get("files");
                    if (files != null) {
                        for (Map<String, Object> f : files) {
                            String filename = (String) f.get("filename");
                            if (filename != null) {
                                String baseName = filename.substring(filename.lastIndexOf('/') + 1);
                                fileFrequencies.put(baseName, fileFrequencies.getOrDefault(baseName, 0) + 1);
                            }
                        }
                    }
                }
            } catch (Exception e) {
                // Ignore
            }
        }

        mostModifiedFiles = fileFrequencies.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .limit(5)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        return new TelemetryDto(totalCommits, commitsLast7Days, commitsLast30Days, longestCommitStreak,
                currentStreak, averageCommitsPerDay, activeCodingHour, activeCodingDay,
                weekendContributionPercent, languageDistribution, topContributors, mostModifiedFiles,
                repositoryAge, lastCommitDate);
    }
}
