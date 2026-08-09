package com.piyush.commitfm_ai.service;

import com.piyush.commitfm_ai.dto.AnalysisResultDto;
import com.piyush.commitfm_ai.dto.DeveloperDNADto;
import com.piyush.commitfm_ai.dto.DeveloperDNADto.Metric;
import org.springframework.stereotype.Service;

@Service
public class DeveloperDNAService {

    public DeveloperDNADto calculateDeveloperDNA(AnalysisResultDto analysis) {
        if (analysis == null) return null;

        DeveloperDNADto dna = new DeveloperDNADto();

        // 1. Coding Consistency
        int commits = analysis.commitSummary != null ? analysis.commitSummary.totalCommitsAnalysed : 0;
        int longestStreak = (analysis.telemetry != null) ? analysis.telemetry.longestCommitStreak : 1;
        int consistencyVal = Math.min(100, Math.max(10, (commits * 2) + (longestStreak * 5)));
        dna.setCodingConsistency(new Metric(
            consistencyVal + "%",
            "Measures commit frequency and regular activity streak patterns.",
            "Longest streak is " + longestStreak + " days with " + commits + " total analyzed commits."
        ));

        // 2. Collaboration Score
        int openPRs = analysis.repositoryActivity != null ? analysis.repositoryActivity.openPRs : 0;
        int closedPRs = analysis.repositoryActivity != null ? analysis.repositoryActivity.closedPRs : 0;
        int totalPRs = openPRs + closedPRs;
        int openIssues = analysis.repositoryActivity != null ? analysis.repositoryActivity.openIssues : 0;
        int closedIssues = analysis.repositoryActivity != null ? analysis.repositoryActivity.closedIssues : 0;
        int totalIssues = openIssues + closedIssues;
        int collabVal = Math.min(100, Math.max(10, (totalPRs * 8) + (totalIssues * 4)));
        dna.setCollaborationScore(new Metric(
            collabVal + "%",
            "Evaluates team integration and discussions via Pull Requests and Issues.",
            totalPRs + " Pull Requests and " + totalIssues + " Issues parsed from repository state."
        ));

        // 3. Repository Ownership
        // Assume author represents a dominant share of code if commits are significant.
        int ownershipVal = commits > 0 ? Math.min(100, Math.max(50, 100 - (totalPRs * 2))) : 0;
        dna.setRepositoryOwnership(new Metric(
            ownershipVal + "%",
            "Measures code contribution share and direct repository oversight.",
            "Estimated code ownership calculated based on commit-to-PR density index."
        ));

        // 4. Language Diversity
        int langCount = (analysis.repositorySummary != null && analysis.repositorySummary.languageDistribution != null)
                ? analysis.repositorySummary.languageDistribution.size()
                : 1;
        int langVal = Math.min(100, langCount * 25);
        String langList = (analysis.repositorySummary != null && analysis.repositorySummary.languageDistribution != null)
                ? String.join(", ", analysis.repositorySummary.languageDistribution.keySet())
                : "Unknown";
        dna.setLanguageDiversity(new Metric(
            langVal + "%",
            "Evaluates technology stack breadth and polyglot capabilities.",
            langCount + " active languages identified: " + langList + "."
        ));

        // 5. Commit Discipline
        // Derive from streak metrics or commit frequency stability
        int disciplineVal = Math.min(100, 60 + (longestStreak * 4));
        dna.setCommitDiscipline(new Metric(
            disciplineVal + "/100",
            "Measures workflow order and commit message structure consistency.",
            "Calculated from continuous streak length and commit frequencies."
        ));

        // 6. Active Coding Time
        String busyHour = (analysis.commitSummary != null && analysis.commitSummary.busiestHour != null)
                ? analysis.commitSummary.busiestHour
                : "12:00";
        String busyDay = (analysis.commitSummary != null && analysis.commitSummary.busiestDay != null)
                ? analysis.commitSummary.busiestDay
                : "Wednesday";
        dna.setActiveCodingTime(new Metric(
            busyHour,
            "Pinpoints peak hours of high-concentration development work.",
            "Busiest day of work is " + busyDay + " with highest density at " + busyHour + "."
        ));

        // 7. Weekend Activity
        double weekendPct = (analysis.telemetry != null) ? analysis.telemetry.weekendContributionPercent : 0.0;
        dna.setWeekendActivity(new Metric(
            weekendPct + "%",
            "Identifies out-of-hours dedication and hobby contribution rates.",
            weekendPct + "% of total commits pushed during Saturday and Sunday."
        ));

        // 8. Documentation Score
        String readme = analysis.repositoryActivity != null ? analysis.repositoryActivity.readmeContent : null;
        int readmeLen = readme != null ? readme.length() : 0;
        int docVal = readmeLen > 1500 ? 100 : (readmeLen > 500 ? 75 : (readmeLen > 0 ? 50 : 10));
        dna.setDocumentationScore(new Metric(
            docVal + "%",
            "Evaluates project readmes and descriptive guides completeness.",
            "README file consists of " + readmeLen + " characters."
        ));

        // 9. Maintainability Indicators
        int files = (analysis.repositoryMetrics != null) ? analysis.repositoryMetrics.numberOfFiles : 0;
        int dirs = (analysis.repositoryMetrics != null) ? analysis.repositoryMetrics.numberOfDirectories : 0;
        int maintainabilityVal = dirs > 0 ? Math.min(100, Math.max(30, 100 - (files / dirs))) : 80;
        dna.setMaintainabilityIndicators(new Metric(
            maintainabilityVal + "/100",
            "Analyzes code modularity and structural layout density.",
            files + " files distributed across " + dirs + " directories."
        ));

        // 10. Engineering Archetype
        String archetype = "Software Engineer";
        String archetypeReason = "Balanced contribution across code and repository maintenance.";
        if (langCount >= 3) {
            archetype = "Polyglot Generalist";
            archetypeReason = "Demonstrates command of multiple tools and language syntaxes.";
        } else if (totalPRs > 10 && totalIssues > 10) {
            archetype = "Collaborator / Open Source Core";
            archetypeReason = "Highly active in reviewing pull requests and resolving discussions.";
        } else if (files > 100 && dirs > 15) {
            archetype = "Systems Architect";
            archetypeReason = "Orchestrates highly complex directory layouts and large codebases.";
        }
        dna.setEngineeringArchetype(new Metric(
            archetype,
            archetypeReason,
            "Based on language count of " + langCount + ", " + totalPRs + " PRs, and " + files + " files."
        ));

        return dna;
    }
}
