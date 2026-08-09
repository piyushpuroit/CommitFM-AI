package com.piyush.commitfm_ai.dto;

public class DeveloperDNADto {
    public static class Metric {
        private String value;
        private String reason;
        private String evidence;

        public Metric() {}

        public Metric(String value, String reason, String evidence) {
            this.value = value;
            this.reason = reason;
            this.evidence = evidence;
        }

        public String getValue() { return value; }
        public void setValue(String value) { this.value = value; }

        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }

        public String getEvidence() { return evidence; }
        public void setEvidence(String evidence) { this.evidence = evidence; }
    }

    private Metric codingConsistency;
    private Metric collaborationScore;
    private Metric repositoryOwnership;
    private Metric languageDiversity;
    private Metric commitDiscipline;
    private Metric activeCodingTime;
    private Metric weekendActivity;
    private Metric documentationScore;
    private Metric maintainabilityIndicators;
    private Metric engineeringArchetype;

    public Metric getCodingConsistency() { return codingConsistency; }
    public void setCodingConsistency(Metric codingConsistency) { this.codingConsistency = codingConsistency; }

    public Metric getCollaborationScore() { return collaborationScore; }
    public void setCollaborationScore(Metric collaborationScore) { this.collaborationScore = collaborationScore; }

    public Metric getRepositoryOwnership() { return repositoryOwnership; }
    public void setRepositoryOwnership(Metric repositoryOwnership) { this.repositoryOwnership = repositoryOwnership; }

    public Metric getLanguageDiversity() { return languageDiversity; }
    public void setLanguageDiversity(Metric languageDiversity) { this.languageDiversity = languageDiversity; }

    public Metric getCommitDiscipline() { return commitDiscipline; }
    public void setCommitDiscipline(Metric commitDiscipline) { this.commitDiscipline = commitDiscipline; }

    public Metric getActiveCodingTime() { return activeCodingTime; }
    public void setActiveCodingTime(Metric activeCodingTime) { this.activeCodingTime = activeCodingTime; }

    public Metric getWeekendActivity() { return weekendActivity; }
    public void setWeekendActivity(Metric weekendActivity) { this.weekendActivity = weekendActivity; }

    public Metric getDocumentationScore() { return documentationScore; }
    public void setDocumentationScore(Metric documentationScore) { this.documentationScore = documentationScore; }

    public Metric getMaintainabilityIndicators() { return maintainabilityIndicators; }
    public void setMaintainabilityIndicators(Metric maintainabilityIndicators) { this.maintainabilityIndicators = maintainabilityIndicators; }

    public Metric getEngineeringArchetype() { return engineeringArchetype; }
    public void setEngineeringArchetype(Metric engineeringArchetype) { this.engineeringArchetype = engineeringArchetype; }
}
