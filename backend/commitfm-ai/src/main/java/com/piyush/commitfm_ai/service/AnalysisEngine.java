package com.piyush.commitfm_ai.service;

import com.piyush.commitfm_ai.dto.CommitDto;
import com.piyush.commitfm_ai.dto.AnalysisResultDto;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AnalysisEngine {

    /**
     * Analyzes commit list to calculate frequency, consistency, repository health, and engineering maturity.
     */
    public AnalysisResultDto analyzeCommits(List<CommitDto> commits) {
        if (commits == null || commits.isEmpty()) {
            return new AnalysisResultDto(0.0, 0.0, 100.0, 0.0);
        }

        double frequency = calculateFrequency(commits);
        double consistency = calculateConsistency(commits);
        double health = calculateHealth(commits);
        double maturity = calculateMaturity(commits);

        return new AnalysisResultDto(frequency, consistency, health, maturity);
    }

    private double calculateFrequency(List<CommitDto> commits) {
        // Commits per week (total commits / days * 7)
        if (commits.size() < 2) return commits.size() * 1.0;
        
        try {
            LocalDate earliest = parseDate(commits.get(commits.size() - 1).getDate());
            LocalDate latest = parseDate(commits.get(0).getDate());
            long days = ChronoUnit.DAYS.between(earliest, latest);
            if (days <= 0) days = 1;
            return ((double) commits.size() / days) * 7.0;
        } catch (Exception e) {
            return commits.size() * 1.0;
        }
    }

    private double calculateConsistency(List<CommitDto> commits) {
        // Percentage of active days within the commit window
        Set<LocalDate> uniqueDays = new HashSet<>();
        for (CommitDto commit : commits) {
            try {
                uniqueDays.add(parseDate(commit.getDate()));
            } catch (Exception ignored) {}
        }
        
        if (uniqueDays.isEmpty()) return 0.0;
        
        try {
            LocalDate earliest = parseDate(commits.get(commits.size() - 1).getDate());
            LocalDate latest = parseDate(commits.get(0).getDate());
            long days = ChronoUnit.DAYS.between(earliest, latest) + 1;
            double ratio = (double) uniqueDays.size() / days;
            return Math.min(ratio * 100.0, 100.0);
        } catch (Exception e) {
            return 50.0;
        }
    }

    private double calculateHealth(List<CommitDto> commits) {
        // 100 - (percentage of "fix" commits). A high ratio of fixes suggests buggy codebase.
        long fixes = commits.stream()
                .filter(c -> c.getMessage() != null && c.getMessage().toLowerCase().startsWith("fix"))
                .count();
        double ratio = (double) fixes / commits.size();
        return (1.0 - ratio) * 100.0;
    }

    private double calculateMaturity(List<CommitDto> commits) {
        // Percentage of conventional commits matching structured prefixes
        long conventionalCount = commits.stream()
                .filter(c -> c.getMessage() != null && (
                        c.getMessage().startsWith("feat:") ||
                        c.getMessage().startsWith("fix:") ||
                        c.getMessage().startsWith("refactor:") ||
                        c.getMessage().startsWith("docs:") ||
                        c.getMessage().startsWith("style:") ||
                        c.getMessage().startsWith("test:") ||
                        c.getMessage().startsWith("chore:")
                )).count();
        double ratio = (double) conventionalCount / commits.size();
        return ratio * 100.0;
    }

    private LocalDate parseDate(String dateStr) {
        return Instant.parse(dateStr).atZone(ZoneId.systemDefault()).toLocalDate();
    }
}
