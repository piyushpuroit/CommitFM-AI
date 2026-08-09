package com.piyush.commitfm_ai.dto;

import java.util.List;
import java.util.Map;

public class AnalysisResultDto {
    public RepositorySummary repositorySummary;
    public CommitSummary commitSummary;
    public List<ContributorDto> contributors;
    public RepositoryActivity repositoryActivity;
    public RepositoryMetrics repositoryMetrics;
    public TelemetryData telemetry;

    // Legacy fields for backward compatibility
    @Deprecated
    public double frequency;
    @Deprecated
    public double consistency;
    @Deprecated
    public double health;
    @Deprecated
    public double maturity;

    public AnalysisResultDto() {}

    @Deprecated
    public AnalysisResultDto(double frequency, double consistency, double health, double maturity) {
        this.frequency = frequency;
        this.consistency = consistency;
        this.health = health;
        this.maturity = maturity;
    }

    public static class RepositorySummary {
        public String name;
        public String owner;
        public String description;
        public Map<String, Double> languageDistribution;
        public int stars;
        public int forks;
        public int watchers;
        public String defaultBranch;
        public String createdAt;
        public String updatedAt;
        public String pushedAt;
        public List<String> topics;
        public String license;
    }

    public static class CommitSummary {
        public int totalCommitsAnalysed;
        public Map<String, Integer> commitsPerContributor;
        public Map<String, Integer> commitsPerDay;
        public String commitFrequency; // e.g., "4.5 commits/day"
        public String busiestDay;
        public String busiestHour;
    }

    public static class ContributorDto {
        public String login;
        public String avatarUrl;
        public int contributions;
        public double contributionPercent;
    }

    public static class PullRequestDto {
        public String id;
        public String title;
        public String status;
        public String author;
    }

    public static class RepositoryActivity {
        public int openPRs;
        public int closedPRs;
        public int openIssues;
        public int closedIssues;
        public int releasesCount;
        public int tagsCount;
        public String readmeContent;
        public List<String> activeBranches;
        public String latestCommit; // commit date or SHA message description
        public List<PullRequestDto> pullRequests;
    }

    public static class RepositoryMetrics {
        public long repositoryAge; // days
        public long totalSize; // KB
        public String defaultLanguage;
        public int numberOfFiles;
        public int numberOfDirectories;
    }

    public static class TelemetryData {
        public int longestCommitStreak;
        public int currentStreak;
        public double weekendContributionPercent;
        public List<String> mostModifiedFiles;
    }

    public CodebaseHealthData codebaseHealth;
    public DeveloperDnaData developerDna;
    public String engineeringStory;
    public CareerCoachData careerCoach;
    public List<String> resumeBulletPoints;
    public LearningRoadmapData learningRoadmap;

    public static class CodebaseHealthData {
        public int documentationScore;
        public int branchHygiene;
        public int repositoryActivityScore;
        public int busFactor;
        public String dependencyRisk;
        public int maintenanceScore;
        public List<String> technicalDebtIndicators;
    }

    public static class DeveloperDnaData {
        public int codingConsistency;
        public int collaboration;
        public int ownership;
        public int languageDiversity;
        public int focusScore;
        public int discipline;
        public String engineeringArchetype;
        public Map<String, String> evidence;
    }

    public static class CareerCoachData {
        public List<String> strengths;
        public List<String> weaknesses;
        public List<String> recommendedRoles;
        public List<String> skillsToImprove;
        public List<String> learningPriorities;
    }

    public static class LearningRoadmapData {
        public String industryComparison;
        public List<String> nextLearningTopics;
    }
}
