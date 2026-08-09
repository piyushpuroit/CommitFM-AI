package com.piyush.commitfm_ai.dto;

import java.util.List;
import java.util.Map;

public class TelemetryDto {
    private int totalCommits;
    private int commitsLast7Days;
    private int commitsLast30Days;
    private int longestCommitStreak;
    private int currentStreak;
    private double averageCommitsPerDay;
    private int activeCodingHour;
    private String activeCodingDay;
    private double weekendContributionPercent;
    private Map<String, Double> languageDistribution;
    private Map<String, Integer> topContributors;
    private List<String> mostModifiedFiles;
    private int repositoryAge;
    private String lastCommitDate;

    public TelemetryDto() {}

    public TelemetryDto(int totalCommits, int commitsLast7Days, int commitsLast30Days, int longestCommitStreak,
                        int currentStreak, double averageCommitsPerDay, int activeCodingHour, String activeCodingDay,
                        double weekendContributionPercent, Map<String, Double> languageDistribution,
                        Map<String, Integer> topContributors, List<String> mostModifiedFiles, int repositoryAge,
                        String lastCommitDate) {
        this.totalCommits = totalCommits;
        this.commitsLast7Days = commitsLast7Days;
        this.commitsLast30Days = commitsLast30Days;
        this.longestCommitStreak = longestCommitStreak;
        this.currentStreak = currentStreak;
        this.averageCommitsPerDay = averageCommitsPerDay;
        this.activeCodingHour = activeCodingHour;
        this.activeCodingDay = activeCodingDay;
        this.weekendContributionPercent = weekendContributionPercent;
        this.languageDistribution = languageDistribution;
        this.topContributors = topContributors;
        this.mostModifiedFiles = mostModifiedFiles;
        this.repositoryAge = repositoryAge;
        this.lastCommitDate = lastCommitDate;
    }

    // Getters and Setters
    public int getTotalCommits() { return totalCommits; }
    public void setTotalCommits(int totalCommits) { this.totalCommits = totalCommits; }

    public int getCommitsLast7Days() { return commitsLast7Days; }
    public void setCommitsLast7Days(int commitsLast7Days) { this.commitsLast7Days = commitsLast7Days; }

    public int getCommitsLast30Days() { return commitsLast30Days; }
    public void setCommitsLast30Days(int commitsLast30Days) { this.commitsLast30Days = commitsLast30Days; }

    public int getLongestCommitStreak() { return longestCommitStreak; }
    public void setLongestCommitStreak(int longestCommitStreak) { this.longestCommitStreak = longestCommitStreak; }

    public int getCurrentStreak() { return currentStreak; }
    public void setCurrentStreak(int currentStreak) { this.currentStreak = currentStreak; }

    public double getAverageCommitsPerDay() { return averageCommitsPerDay; }
    public void setAverageCommitsPerDay(double averageCommitsPerDay) { this.averageCommitsPerDay = averageCommitsPerDay; }

    public int getActiveCodingHour() { return activeCodingHour; }
    public void setActiveCodingHour(int activeCodingHour) { this.activeCodingHour = activeCodingHour; }

    public String getActiveCodingDay() { return activeCodingDay; }
    public void setActiveCodingDay(String activeCodingDay) { this.activeCodingDay = activeCodingDay; }

    public double getWeekendContributionPercent() { return weekendContributionPercent; }
    public void setWeekendContributionPercent(double weekendContributionPercent) { this.weekendContributionPercent = weekendContributionPercent; }

    public Map<String, Double> getLanguageDistribution() { return languageDistribution; }
    public void setLanguageDistribution(Map<String, Double> languageDistribution) { this.languageDistribution = languageDistribution; }

    public Map<String, Integer> getTopContributors() { return topContributors; }
    public void setTopContributors(Map<String, Integer> topContributors) { this.topContributors = topContributors; }

    public List<String> getMostModifiedFiles() { return mostModifiedFiles; }
    public void setMostModifiedFiles(List<String> mostModifiedFiles) { this.mostModifiedFiles = mostModifiedFiles; }

    public int getRepositoryAge() { return repositoryAge; }
    public void setRepositoryAge(int repositoryAge) { this.repositoryAge = repositoryAge; }

    public String getLastCommitDate() { return lastCommitDate; }
    public void setLastCommitDate(String lastCommitDate) { this.lastCommitDate = lastCommitDate; }
}
