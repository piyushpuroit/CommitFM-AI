package com.piyush.commitfm_ai.service;

import com.piyush.commitfm_ai.dto.AnalysisResultDto;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class AnalysisEngineService {

    private final RestTemplate restTemplate;
    private final Map<String, AnalysisResultDto> analysisCache = new java.util.concurrent.ConcurrentHashMap<>();

    public AnalysisEngineService() {
        this.restTemplate = new RestTemplate();
    }

    public AnalysisResultDto getCachedAnalysis(String owner, String repo) {
        return analysisCache.get(owner.toLowerCase() + "/" + repo.toLowerCase());
    }

    private <T> T fetchGitHubData(String url, String accessToken, org.springframework.core.ParameterizedTypeReference<T> responseType) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Accept", "application/json");
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);
        try {
            return restTemplate.exchange(url, HttpMethod.GET, requestEntity, responseType).getBody();
        } catch (Exception e) {
            System.err.println("Error fetching " + url + ": " + e.getMessage());
            return null;
        }
    }

    @SuppressWarnings("unchecked")
    public AnalysisResultDto analyzeRepository(String accessToken, String owner, String repo) {
        // 1. Fetch Repository Details first synchronously to get default branch
        Map<String, Object> rawRepo = fetchGitHubData("https://api.github.com/repos/" + owner + "/" + repo, accessToken, new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {});
        if (rawRepo == null) return null;

        String defaultBranch = (String) rawRepo.get("default_branch");
        final String branchName = defaultBranch != null ? defaultBranch : "main";

        // 2. Launch all other futures in parallel
        CompletableFuture<Map<String, Object>> languagesFuture = CompletableFuture.supplyAsync(() -> 
            fetchGitHubData("https://api.github.com/repos/" + owner + "/" + repo + "/languages", accessToken, new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {})
        );

        CompletableFuture<List<Map<String, Object>>> contributorsFuture = CompletableFuture.supplyAsync(() -> 
            fetchGitHubData("https://api.github.com/repos/" + owner + "/" + repo + "/contributors?per_page=100", accessToken, new org.springframework.core.ParameterizedTypeReference<List<Map<String, Object>>>() {})
        );

        CompletableFuture<List<Map<String, Object>>> branchesFuture = CompletableFuture.supplyAsync(() -> 
            fetchGitHubData("https://api.github.com/repos/" + owner + "/" + repo + "/branches?per_page=100", accessToken, new org.springframework.core.ParameterizedTypeReference<List<Map<String, Object>>>() {})
        );

        CompletableFuture<List<Map<String, Object>>> pullsFuture = CompletableFuture.supplyAsync(() -> 
            fetchGitHubData("https://api.github.com/repos/" + owner + "/" + repo + "/pulls?state=all&per_page=100", accessToken, new org.springframework.core.ParameterizedTypeReference<List<Map<String, Object>>>() {})
        );

        CompletableFuture<List<Map<String, Object>>> issuesFuture = CompletableFuture.supplyAsync(() -> 
            fetchGitHubData("https://api.github.com/repos/" + owner + "/" + repo + "/issues?state=all&per_page=100", accessToken, new org.springframework.core.ParameterizedTypeReference<List<Map<String, Object>>>() {})
        );

        CompletableFuture<List<Map<String, Object>>> releasesFuture = CompletableFuture.supplyAsync(() -> 
            fetchGitHubData("https://api.github.com/repos/" + owner + "/" + repo + "/releases?per_page=100", accessToken, new org.springframework.core.ParameterizedTypeReference<List<Map<String, Object>>>() {})
        );

        CompletableFuture<List<Map<String, Object>>> tagsFuture = CompletableFuture.supplyAsync(() -> 
            fetchGitHubData("https://api.github.com/repos/" + owner + "/" + repo + "/tags?per_page=100", accessToken, new org.springframework.core.ParameterizedTypeReference<List<Map<String, Object>>>() {})
        );

        CompletableFuture<Map<String, Object>> readmeFuture = CompletableFuture.supplyAsync(() -> 
            fetchGitHubData("https://api.github.com/repos/" + owner + "/" + repo + "/readme", accessToken, new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {})
        );

        CompletableFuture<Map<String, Object>> treeFuture = CompletableFuture.supplyAsync(() -> 
            fetchGitHubData("https://api.github.com/repos/" + owner + "/" + repo + "/git/trees/" + branchName + "?recursive=1", accessToken, new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {})
        );

        // Fetch up to 500 commits (5 pages) in parallel
        List<CompletableFuture<List<Map<String, Object>>>> commitPagesFutures = new ArrayList<>();
        for (int p = 1; p <= 5; p++) {
            final int page = p;
            commitPagesFutures.add(CompletableFuture.supplyAsync(() -> 
                fetchGitHubData("https://api.github.com/repos/" + owner + "/" + repo + "/commits?per_page=100&page=" + page, accessToken, new org.springframework.core.ParameterizedTypeReference<List<Map<String, Object>>>() {})
            ));
        }

        // Wait for all main futures to complete
        List<CompletableFuture<?>> allMainFutures = new ArrayList<>();
        allMainFutures.add(languagesFuture);
        allMainFutures.add(contributorsFuture);
        allMainFutures.add(branchesFuture);
        allMainFutures.add(pullsFuture);
        allMainFutures.add(issuesFuture);
        allMainFutures.add(releasesFuture);
        allMainFutures.add(tagsFuture);
        allMainFutures.add(readmeFuture);
        allMainFutures.add(treeFuture);
        allMainFutures.addAll(commitPagesFutures);

        CompletableFuture.allOf(allMainFutures.toArray(new CompletableFuture[0])).join();

        // Get results from futures
        Map<String, Object> rawLanguagesObj = languagesFuture.join();
        if (rawLanguagesObj == null) rawLanguagesObj = Collections.emptyMap();
        Map<String, Number> rawLanguages = new HashMap<>();
        for (Map.Entry<String, Object> entry : rawLanguagesObj.entrySet()) {
            if (entry.getValue() instanceof Number) {
                rawLanguages.put(entry.getKey(), (Number) entry.getValue());
            }
        }

        List<Map<String, Object>> rawContributors = contributorsFuture.join();
        if (rawContributors == null) rawContributors = Collections.emptyList();

        List<Map<String, Object>> rawBranches = branchesFuture.join();
        if (rawBranches == null) rawBranches = Collections.emptyList();

        List<Map<String, Object>> rawPRs = pullsFuture.join();
        if (rawPRs == null) rawPRs = Collections.emptyList();

        List<Map<String, Object>> rawIssues = issuesFuture.join();
        if (rawIssues == null) rawIssues = Collections.emptyList();

        List<Map<String, Object>> rawReleases = releasesFuture.join();
        if (rawReleases == null) rawReleases = Collections.emptyList();

        List<Map<String, Object>> rawTags = tagsFuture.join();
        if (rawTags == null) rawTags = Collections.emptyList();

        Map<String, Object> rawReadme = readmeFuture.join();

        Map<String, Object> rawTree = treeFuture.join();

        List<Map<String, Object>> allCommits = new ArrayList<>();
        for (CompletableFuture<List<Map<String, Object>>> cf : commitPagesFutures) {
            List<Map<String, Object>> pageCommits = cf.join();
            if (pageCommits != null) {
                allCommits.addAll(pageCommits);
            }
        }

        AnalysisResultDto result = new AnalysisResultDto();

        // 1. Language Distribution
        double totalLangBytes = 0;
        for (Number val : rawLanguages.values()) {
            totalLangBytes += val.doubleValue();
        }

        Map<String, Double> languageDistribution = new HashMap<>();
        for (Map.Entry<String, Number> entry : rawLanguages.entrySet()) {
            double percent = totalLangBytes > 0 ? (entry.getValue().doubleValue() / totalLangBytes) * 100 : 0;
            languageDistribution.put(entry.getKey(), Math.round(percent * 10.0) / 10.0);
        }

        // 2. License extract
        String licenseName = "None";
        if (rawRepo.get("license") != null) {
            Map<String, Object> lic = (Map<String, Object>) rawRepo.get("license");
            licenseName = lic.get("name") != null ? (String) lic.get("name") : (String) lic.get("key");
        }

        // 3. Topics extract
        List<String> topics = (List<String>) rawRepo.get("topics");
        if (topics == null) topics = Collections.emptyList();

        // Populate RepositorySummary
        result.repositorySummary = new AnalysisResultDto.RepositorySummary();
        result.repositorySummary.name = (String) rawRepo.get("name");
        Map<String, Object> ownerMap = (Map<String, Object>) rawRepo.get("owner");
        result.repositorySummary.owner = ownerMap != null ? (String) ownerMap.get("login") : owner;
        result.repositorySummary.description = (String) rawRepo.get("description");
        result.repositorySummary.languageDistribution = languageDistribution;
        result.repositorySummary.stars = ((Number) rawRepo.get("stargazers_count")).intValue();
        result.repositorySummary.forks = ((Number) rawRepo.get("forks_count")).intValue();
        result.repositorySummary.watchers = ((Number) rawRepo.get("watchers_count")).intValue();
        result.repositorySummary.defaultBranch = defaultBranch;
        result.repositorySummary.createdAt = (String) rawRepo.get("created_at");
        result.repositorySummary.updatedAt = (String) rawRepo.get("updated_at");
        result.repositorySummary.pushedAt = (String) rawRepo.get("pushed_at");
        result.repositorySummary.topics = topics;
        result.repositorySummary.license = licenseName;

        // 4. Ingest Commits Analysis
        int totalCommitsAnalysed = allCommits.size();
        Map<String, Integer> commitsPerContributor = new HashMap<>();
        Map<String, Integer> commitsPerDay = new HashMap<>();
        Map<String, Integer> hourDistribution = new HashMap<>();
        Map<String, Integer> dayDistribution = new HashMap<>();
        String latestCommitStr = "N/A";
        int weekendCommits = 0;

        if (!allCommits.isEmpty()) {
            Map<String, Object> latestCommitObj = allCommits.get(0);
            Map<String, Object> commitDetail = (Map<String, Object>) latestCommitObj.get("commit");
            if (commitDetail != null) {
                latestCommitStr = (String) commitDetail.get("message");
            }

            for (Map<String, Object> commitMap : allCommits) {
                Map<String, Object> authorObj = (Map<String, Object>) commitMap.get("author");
                String authorName = "Unknown";
                if (authorObj != null) {
                    authorName = (String) authorObj.get("login");
                } else {
                    Map<String, Object> innerCommit = (Map<String, Object>) commitMap.get("commit");
                    if (innerCommit != null) {
                        Map<String, Object> commitAuthor = (Map<String, Object>) innerCommit.get("author");
                        if (commitAuthor != null) {
                            authorName = (String) commitAuthor.get("name");
                        }
                    }
                }
                commitsPerContributor.put(authorName, commitsPerContributor.getOrDefault(authorName, 0) + 1);

                Map<String, Object> innerCommit = (Map<String, Object>) commitMap.get("commit");
                if (innerCommit != null) {
                    Map<String, Object> commitAuthor = (Map<String, Object>) innerCommit.get("author");
                    if (commitAuthor != null) {
                        String dateStr = (String) commitAuthor.get("date");
                        if (dateStr != null) {
                            try {
                                ZonedDateTime zdt = ZonedDateTime.parse(dateStr);
                                String dayOnly = zdt.format(DateTimeFormatter.ISO_LOCAL_DATE);
                                commitsPerDay.put(dayOnly, commitsPerDay.getOrDefault(dayOnly, 0) + 1);

                                String hr = String.format("%02d:00", zdt.getHour());
                                hourDistribution.put(hr, hourDistribution.getOrDefault(hr, 0) + 1);

                                String dayOfWeek = zdt.getDayOfWeek().name();
                                dayDistribution.put(dayOfWeek, dayDistribution.getOrDefault(dayOfWeek, 0) + 1);

                                if (zdt.getDayOfWeek() == java.time.DayOfWeek.SATURDAY || zdt.getDayOfWeek() == java.time.DayOfWeek.SUNDAY) {
                                    weekendCommits++;
                                }
                            } catch (Exception de) {
                                // Ignore
                            }
                        }
                    }
                }
            }
        }

        String busiestDay = dayDistribution.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("N/A");

        String busiestHour = hourDistribution.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("N/A");

        double avgCommits = 0;
        if (!commitsPerDay.isEmpty()) {
            double totalDaysWithCommits = commitsPerDay.size();
            double totalIngested = totalCommitsAnalysed;
            avgCommits = Math.round((totalIngested / totalDaysWithCommits) * 10.0) / 10.0;
        }

        result.commitSummary = new AnalysisResultDto.CommitSummary();
        result.commitSummary.totalCommitsAnalysed = totalCommitsAnalysed;
        result.commitSummary.commitsPerContributor = commitsPerContributor;
        result.commitSummary.commitsPerDay = commitsPerDay;
        result.commitSummary.commitFrequency = avgCommits + " commits/day";
        result.commitSummary.busiestDay = busiestDay;
        result.commitSummary.busiestHour = busiestHour;

        // 5. Contributors Dto
        result.contributors = new ArrayList<>();
        double totalContribs = 0;
        for (Map<String, Object> cMap : rawContributors) {
            if (cMap.get("contributions") != null) {
                totalContribs += ((Number) cMap.get("contributions")).doubleValue();
            }
        }

        for (Map<String, Object> cMap : rawContributors) {
            AnalysisResultDto.ContributorDto cDto = new AnalysisResultDto.ContributorDto();
            cDto.login = (String) cMap.get("login");
            cDto.avatarUrl = (String) cMap.get("avatar_url");
            cDto.contributions = cMap.get("contributions") != null ? ((Number) cMap.get("contributions")).intValue() : 0;
            double pct = totalContribs > 0 ? (cDto.contributions / totalContribs) * 100 : 0;
            cDto.contributionPercent = Math.round(pct * 10.0) / 10.0;
            result.contributors.add(cDto);
        }

        // 6. PR & Issues Classification
        int openPRs = 0;
        int closedPRs = 0;
        List<AnalysisResultDto.PullRequestDto> pullRequests = new ArrayList<>();
        for (Map<String, Object> prMap : rawPRs) {
            String prState = (String) prMap.get("state");
            if ("open".equalsIgnoreCase(prState)) {
                openPRs++;
            } else {
                closedPRs++;
            }

            AnalysisResultDto.PullRequestDto prDto = new AnalysisResultDto.PullRequestDto();
            prDto.id = "#" + prMap.get("number");
            prDto.title = (String) prMap.get("title");
            prDto.status = "open".equalsIgnoreCase(prState) ? "Open" : "Closed";
            Map<String, Object> prUser = (Map<String, Object>) prMap.get("user");
            prDto.author = prUser != null ? (String) prUser.get("login") : "unknown";
            pullRequests.add(prDto);
        }

        // GitHub issues API includes pull requests in lists, so filter them out.
        int openIssues = 0;
        int closedIssues = 0;
        for (Map<String, Object> issueMap : rawIssues) {
            if (issueMap.containsKey("pull_request")) {
                continue;
            }
            String issueState = (String) issueMap.get("state");
            if ("open".equalsIgnoreCase(issueState)) {
                openIssues++;
            } else {
                closedIssues++;
            }
        }

        // 7. Active branches names
        List<String> activeBranches = new ArrayList<>();
        for (Map<String, Object> bMap : rawBranches) {
            activeBranches.add((String) bMap.get("name"));
        }

        // 8. README contents
        String readmeStr = "README not found.";
        if (rawReadme != null && rawReadme.get("content") != null) {
            try {
                String rawContent = (String) rawReadme.get("content");
                // Base64 decode content (ignoring newlines)
                byte[] decodedBytes = Base64.getMimeDecoder().decode(rawContent);
                readmeStr = new String(decodedBytes, java.nio.charset.StandardCharsets.UTF_8);
            } catch (Exception e) {
                readmeStr = "Failed to parse README content.";
            }
        }

        result.repositoryActivity = new AnalysisResultDto.RepositoryActivity();
        result.repositoryActivity.openPRs = openPRs;
        result.repositoryActivity.closedPRs = closedPRs;
        result.repositoryActivity.openIssues = openIssues;
        result.repositoryActivity.closedIssues = closedIssues;
        result.repositoryActivity.releasesCount = rawReleases.size();
        result.repositoryActivity.tagsCount = rawTags.size();
        result.repositoryActivity.readmeContent = readmeStr;
        result.repositoryActivity.activeBranches = activeBranches;
        result.repositoryActivity.latestCommit = latestCommitStr;
        result.repositoryActivity.pullRequests = pullRequests;

        // 9. File Tree
        int numFiles = 0;
        int numDirs = 0;
        if (rawTree != null && rawTree.get("tree") != null) {
            List<Map<String, Object>> treeList = (List<Map<String, Object>>) rawTree.get("tree");
            for (Map<String, Object> treeItem : treeList) {
                String type = (String) treeItem.get("type");
                if ("blob".equalsIgnoreCase(type)) {
                    numFiles++;
                } else if ("tree".equalsIgnoreCase(type)) {
                    numDirs++;
                }
            }
        }

        long ageInDays = 0;
        String creationDate = (String) rawRepo.get("created_at");
        if (creationDate != null) {
            try {
                Instant created = Instant.parse(creationDate);
                ageInDays = Duration.between(created, Instant.now()).toDays();
            } catch (Exception ae) {
                // Fallback
            }
        }

        result.repositoryMetrics = new AnalysisResultDto.RepositoryMetrics();
        result.repositoryMetrics.repositoryAge = ageInDays;
        result.repositoryMetrics.totalSize = ((Number) rawRepo.get("size")).longValue();
        result.repositoryMetrics.defaultLanguage = (String) rawRepo.get("language");
        result.repositoryMetrics.numberOfFiles = numFiles;
        result.repositoryMetrics.numberOfDirectories = numDirs;

        // 10. Commit Streaks & Telemetry
        int longestCommitStreak = 0;
        int currentStreak = 0;
        if (!commitsPerDay.isEmpty()) {
            List<LocalDate> sortedDates = commitsPerDay.keySet().stream()
                    .map(LocalDate::parse)
                    .sorted()
                    .collect(Collectors.toList());

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
            if (commitsPerDay.containsKey(today.toString())) {
                currentStreak = 1;
                LocalDate checkDate = yesterday;
                while (commitsPerDay.containsKey(checkDate.toString())) {
                    currentStreak++;
                    checkDate = checkDate.minus(1, ChronoUnit.DAYS);
                }
            } else if (commitsPerDay.containsKey(yesterday.toString())) {
                currentStreak = 1;
                LocalDate checkDate = yesterday.minus(1, ChronoUnit.DAYS);
                while (commitsPerDay.containsKey(checkDate.toString())) {
                    currentStreak++;
                    checkDate = checkDate.minus(1, ChronoUnit.DAYS);
                }
            }
        }

        double weekendPercent = totalCommitsAnalysed > 0 
                ? Math.round(((double) weekendCommits / totalCommitsAnalysed) * 10000.0) / 100.0
                : 0.0;

        // Parallelize fetching detail of top 5 commits to fetch modified files
        List<CompletableFuture<Void>> fileFetchFutures = new ArrayList<>();
        Map<String, Integer> fileFrequencies = Collections.synchronizedMap(new HashMap<>());
        int countToFetch = Math.min(5, allCommits.size());
        for (int i = 0; i < countToFetch; i++) {
            String sha = (String) allCommits.get(i).get("sha");
            String commitDetailUrl = "https://api.github.com/repos/" + owner + "/" + repo + "/commits/" + sha;
            fileFetchFutures.add(CompletableFuture.runAsync(() -> {
                Map<String, Object> details = fetchGitHubData(commitDetailUrl, accessToken, new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {});
                if (details != null && details.get("files") != null) {
                    List<Map<String, Object>> files = (List<Map<String, Object>>) details.get("files");
                    for (Map<String, Object> f : files) {
                        String filename = (String) f.get("filename");
                        if (filename != null) {
                            fileFrequencies.put(filename, fileFrequencies.getOrDefault(filename, 0) + 1);
                        }
                    }
                }
            }));
        }
        CompletableFuture.allOf(fileFetchFutures.toArray(new CompletableFuture[0])).join();

        List<String> mostModifiedFiles = fileFrequencies.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .limit(5)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        result.telemetry = new AnalysisResultDto.TelemetryData();
        result.telemetry.longestCommitStreak = longestCommitStreak;
        result.telemetry.currentStreak = currentStreak;
        result.telemetry.weekendContributionPercent = weekendPercent;
        result.telemetry.mostModifiedFiles = mostModifiedFiles;

        generateAdvancedCalculations(result, owner, repo);

        analysisCache.put(owner.toLowerCase() + "/" + repo.toLowerCase(), result);
        return result;
    }

    private void generateAdvancedCalculations(AnalysisResultDto result, String owner, String repo) {
        // --- 1. Codebase Health ---
        result.codebaseHealth = new AnalysisResultDto.CodebaseHealthData();
        int readmeLen = (result.repositoryActivity != null && result.repositoryActivity.readmeContent != null)
                ? result.repositoryActivity.readmeContent.length() : 0;
        result.codebaseHealth.documentationScore = readmeLen > 1500 ? 100 : (readmeLen > 500 ? 75 : (readmeLen > 0 ? 50 : 15));
        
        int branches = (result.repositoryActivity != null && result.repositoryActivity.activeBranches != null)
                ? result.repositoryActivity.activeBranches.size() : 1;
        result.codebaseHealth.branchHygiene = branches <= 3 ? 95 : (branches <= 8 ? 80 : 60);
        
        int commits = (result.commitSummary != null) ? result.commitSummary.totalCommitsAnalysed : 0;
        result.codebaseHealth.repositoryActivityScore = Math.min(100, Math.max(10, commits / 4));
        
        int contributorsCount = result.contributors != null ? result.contributors.size() : 1;
        result.codebaseHealth.busFactor = Math.max(1, contributorsCount / 2);
        
        result.codebaseHealth.dependencyRisk = contributorsCount > 10 ? "Medium" : "Low";
        result.codebaseHealth.maintenanceScore = Math.min(100, (result.codebaseHealth.documentationScore + result.codebaseHealth.branchHygiene) / 2);
        
        List<String> debt = new ArrayList<>();
        if (result.codebaseHealth.documentationScore < 50) debt.add("Low documentation coverage");
        if (branches > 8) debt.add("High active branches volume");
        if (result.repositoryMetrics != null && result.repositoryMetrics.numberOfFiles > 100 && result.repositoryMetrics.numberOfDirectories < 5) {
            debt.add("Flat directory structure - potential modularity issues");
        }
        if (debt.isEmpty()) debt.add("No critical debt indicators found");
        result.codebaseHealth.technicalDebtIndicators = debt;

        // --- 2. Developer DNA ---
        result.developerDna = new AnalysisResultDto.DeveloperDnaData();
        int longestStreak = (result.telemetry != null) ? result.telemetry.longestCommitStreak : 1;
        result.developerDna.codingConsistency = Math.min(100, Math.max(10, (commits * 2) + (longestStreak * 5)));
        
        int openPRs = result.repositoryActivity != null ? result.repositoryActivity.openPRs : 0;
        int closedPRs = result.repositoryActivity != null ? result.repositoryActivity.closedPRs : 0;
        int totalPRs = openPRs + closedPRs;
        int openIssues = result.repositoryActivity != null ? result.repositoryActivity.openIssues : 0;
        int closedIssues = result.repositoryActivity != null ? result.repositoryActivity.closedIssues : 0;
        int totalIssues = openIssues + closedIssues;
        result.developerDna.collaboration = Math.min(100, Math.max(10, (totalPRs * 8) + (totalIssues * 4)));
        
        result.developerDna.ownership = commits > 0 ? Math.min(100, Math.max(50, 100 - (totalPRs * 2))) : 0;
        
        int langCount = (result.repositorySummary != null && result.repositorySummary.languageDistribution != null)
                ? result.repositorySummary.languageDistribution.size() : 1;
        result.developerDna.languageDiversity = Math.min(100, langCount * 25);
        
        result.developerDna.focusScore = Math.min(100, 50 + (longestStreak * 5));
        result.developerDna.discipline = Math.min(100, 60 + (longestStreak * 4));
        
        String archetype = "Software Engineer";
        if (langCount >= 3) {
            archetype = "Polyglot Generalist";
        } else if (totalPRs > 10 && totalIssues > 10) {
            archetype = "Collaborator / Open Source Core";
        } else if (result.repositoryMetrics != null && result.repositoryMetrics.numberOfFiles > 100) {
            archetype = "Systems Architect";
        }
        result.developerDna.engineeringArchetype = archetype;
        
        Map<String, String> evidence = new HashMap<>();
        evidence.put("Consistency", "Longest streak is " + longestStreak + " days with " + commits + " total analyzed commits.");
        evidence.put("Collaboration", totalPRs + " Pull Requests and " + totalIssues + " Issues parsed from repository state.");
        evidence.put("Language Diversity", langCount + " active languages identified.");
        result.developerDna.evidence = evidence;

        // --- 3. Engineering Story Narrative ---
        String mainLanguage = (result.repositoryMetrics != null) ? result.repositoryMetrics.defaultLanguage : "Code";
        result.engineeringStory = String.format(
            "This repository, %s, is primarily written in %s, featuring a structure with %d files distributed across %d directories. " +
            "With %d total commits analysed, the development timeline exhibits a longest active streak of %d days. " +
            "On the collaboration front, the codebase has tracked %d issues and %d pull requests, reflecting a structured development cadence.",
            repo, mainLanguage, 
            result.repositoryMetrics != null ? result.repositoryMetrics.numberOfFiles : 0,
            result.repositoryMetrics != null ? result.repositoryMetrics.numberOfDirectories : 0,
            commits, longestStreak, totalIssues, totalPRs
        );

        // --- 4. Career Coach ---
        result.careerCoach = new AnalysisResultDto.CareerCoachData();
        List<String> strengths = new ArrayList<>();
        strengths.add("Active code deliveries with peak active coding days");
        if (longestStreak > 3) strengths.add("Strong consistency shown through a streak of " + longestStreak + " days");
        if (result.codebaseHealth.documentationScore > 70) strengths.add("Solid emphasis on writing documentation");
        result.careerCoach.strengths = strengths;

        List<String> weaknesses = new ArrayList<>();
        if (result.codebaseHealth.documentationScore < 50) weaknesses.add("Documentation coverage is low - risk of tribal knowledge");
        if (branches > 5) weaknesses.add("High active branch count may lead to merge conflicts");
        if (weaknesses.isEmpty()) weaknesses.add("No significant codebase process weaknesses found");
        result.careerCoach.weaknesses = weaknesses;

        List<String> roles = new ArrayList<>();
        if (archetype.equals("Systems Architect")) {
            roles.add("Systems Architect");
            roles.add("Principal Infrastructure Engineer");
        } else if (langCount >= 3) {
            roles.add("Full-Stack Generalist");
            roles.add("Senior Applications Engineer");
        } else {
            roles.add("Backend Engineer");
            roles.add("Software Development Engineer II");
        }
        result.careerCoach.recommendedRoles = roles;

        List<String> improve = new ArrayList<>();
        improve.add("Enhance documentation coverage");
        if (branches > 5) improve.add("Perform regular branch cleanup");
        improve.add("Refactor frequently modified hotspots");
        result.careerCoach.skillsToImprove = improve;

        List<String> priorities = new ArrayList<>();
        priorities.add("Add unit test suites");
        priorities.add("Automate CI/CD configurations");
        result.careerCoach.learningPriorities = priorities;

        // --- 5. Resume Bullet Points ---
        List<String> bullets = new ArrayList<>();
        bullets.add(String.format("Engineered and maintained %s codebase, scaling architecture to %d directories and %d files", repo, 
            result.repositoryMetrics != null ? result.repositoryMetrics.numberOfDirectories : 0,
            result.repositoryMetrics != null ? result.repositoryMetrics.numberOfFiles : 0));
        bullets.add(String.format("Authored over %d commits and established a %d-day continuous integration commit streak", commits, longestStreak));
        bullets.add(String.format("Managed and triaged %d total pull requests and issues, ensuring smooth collaborative reviews", totalPRs + totalIssues));
        result.resumeBulletPoints = bullets;

        // --- 6. Learning Roadmap ---
        result.learningRoadmap = new AnalysisResultDto.LearningRoadmapData();
        result.learningRoadmap.industryComparison = String.format(
            "Comparing your repository stack (%s) with industry expectations: " +
            "Current layout uses standard %s abstractions. Modern enterprise guidelines recommend integrating automated security check rules.",
            mainLanguage, mainLanguage
        );
        List<String> topics = new ArrayList<>();
        topics.add("Advanced CI/CD pipeline automation");
        topics.add("Static analysis tool integrations (SonarQube)");
        topics.add("Docker / Containerization rules for " + mainLanguage + " deploy cycles");
        result.learningRoadmap.nextLearningTopics = topics;
    }
}
