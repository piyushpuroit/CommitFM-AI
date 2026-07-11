package com.piyush.commitfm_ai.dto;

public class AnalysisResultDto {
    private double commitFrequency;
    private double codingConsistency;
    private double repositoryHealth;
    private double engineeringMaturity;

    public AnalysisResultDto() {}

    public AnalysisResultDto(double commitFrequency, double codingConsistency, double repositoryHealth, double engineeringMaturity) {
        this.commitFrequency = commitFrequency;
        this.codingConsistency = codingConsistency;
        this.repositoryHealth = repositoryHealth;
        this.engineeringMaturity = engineeringMaturity;
    }

    // Getters and Setters
    public double getCommitFrequency() { return commitFrequency; }
    public void setCommitFrequency(double commitFrequency) { this.commitFrequency = commitFrequency; }

    public double getCodingConsistency() { return codingConsistency; }
    public void setCodingConsistency(double codingConsistency) { this.codingConsistency = codingConsistency; }

    public double getRepositoryHealth() { return repositoryHealth; }
    public void setRepositoryHealth(double repositoryHealth) { this.repositoryHealth = repositoryHealth; }

    public double getEngineeringMaturity() { return engineeringMaturity; }
    public void setEngineeringMaturity(double engineeringMaturity) { this.engineeringMaturity = engineeringMaturity; }
}
