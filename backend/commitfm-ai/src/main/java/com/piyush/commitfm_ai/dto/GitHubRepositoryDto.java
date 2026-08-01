package com.piyush.commitfm_ai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Map;

public class GitHubRepositoryDto {
    private Long id;
    private String name;
    
    @JsonProperty("full_name")
    private String fullName;
    
    private Map<String, Object> owner;
    private String description;
    private String language;
    private String visibility;
    
    @JsonProperty("private")
    private boolean isPrivate;
    
    @JsonProperty("default_branch")
    private String defaultBranch;
    
    @JsonProperty("stargazers_count")
    private int stars;
    
    @JsonProperty("forks_count")
    private int forks;
    
    @JsonProperty("watchers_count")
    private int watchers;
    
    @JsonProperty("open_issues_count")
    private int openIssues;
    
    private int size;
    
    @JsonProperty("updated_at")
    private String updatedAt;
    
    @JsonProperty("html_url")
    private String htmlUrl;

    public GitHubRepositoryDto() {}

    public GitHubRepositoryDto(Long id, String name, String fullName, Map<String, Object> owner, String description,
                               String language, String visibility, boolean isPrivate, String defaultBranch,
                               int stars, int forks, int watchers, int openIssues, int size, String updatedAt, String htmlUrl) {
        this.id = id;
        this.name = name;
        this.fullName = fullName;
        this.owner = owner;
        this.description = description;
        this.language = language;
        this.visibility = visibility;
        this.isPrivate = isPrivate;
        this.defaultBranch = defaultBranch;
        this.stars = stars;
        this.forks = forks;
        this.watchers = watchers;
        this.openIssues = openIssues;
        this.size = size;
        this.updatedAt = updatedAt;
        this.htmlUrl = htmlUrl;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public Map<String, Object> getOwner() { return owner; }
    public void setOwner(Map<String, Object> owner) { this.owner = owner; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getVisibility() { return visibility; }
    public void setVisibility(String visibility) { this.visibility = visibility; }

    public boolean isPrivate() { return isPrivate; }
    public void setPrivate(boolean isPrivate) { this.isPrivate = isPrivate; }

    public String getDefaultBranch() { return defaultBranch; }
    public void setDefaultBranch(String defaultBranch) { this.defaultBranch = defaultBranch; }

    public int getStars() { return stars; }
    public void setStars(int stars) { this.stars = stars; }

    public int getForks() { return forks; }
    public void setForks(int forks) { this.forks = forks; }

    public int getWatchers() { return watchers; }
    public void setWatchers(int watchers) { this.watchers = watchers; }

    public int getOpenIssues() { return openIssues; }
    public void setOpenIssues(int openIssues) { this.openIssues = openIssues; }

    public int getSize() { return size; }
    public void setSize(int size) { this.size = size; }

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }

    public String getHtmlUrl() { return htmlUrl; }
    public void setHtmlUrl(String htmlUrl) { this.htmlUrl = htmlUrl; }
}
