package com.piyush.commitfm_ai.dto;

public class GitHubRepositoryDto {
    private Long id;
    private String name;
    private String language;
    private int stars;
    private int forks;
    private String updatedAt;

    public GitHubRepositoryDto() {}

    public GitHubRepositoryDto(Long id, String name, String language, int stars, int forks, String updatedAt) {
        this.id = id;
        this.name = name;
        this.language = language;
        this.stars = stars;
        this.forks = forks;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public int getStars() { return stars; }
    public void setStars(int stars) { this.stars = stars; }

    public int getForks() { return forks; }
    public void setForks(int forks) { this.forks = forks; }

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}
