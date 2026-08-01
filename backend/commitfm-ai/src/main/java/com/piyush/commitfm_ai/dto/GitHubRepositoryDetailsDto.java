package com.piyush.commitfm_ai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.Map;

public class GitHubRepositoryDetailsDto {
    private String name;
    private String description;
    private Map<String, Object> owner;
    private String language;
    private Map<String, Object> license;

    @JsonProperty("stargazers_count")
    private int stars;

    @JsonProperty("forks_count")
    private int forks;

    @JsonProperty("watchers_count")
    private int watchers;

    @JsonProperty("default_branch")
    private String defaultBranch;

    private String visibility;

    @JsonProperty("created_at")
    private String createdAt;

    @JsonProperty("updated_at")
    private String updatedAt;

    private int size;
    private List<String> topics;
    private String homepage;

    @JsonProperty("open_issues_count")
    private int openIssues;

    @JsonProperty("html_url")
    private String htmlUrl;

    public GitHubRepositoryDetailsDto() {}

    public GitHubRepositoryDetailsDto(String name, String description, Map<String, Object> owner, String language,
                                      Map<String, Object> license, int stars, int forks, int watchers,
                                      String defaultBranch, String visibility, String createdAt, String updatedAt,
                                      int size, List<String> topics, String homepage, int openIssues, String htmlUrl) {
        this.name = name;
        this.description = description;
        this.owner = owner;
        this.language = language;
        this.license = license;
        this.stars = stars;
        this.forks = forks;
        this.watchers = watchers;
        this.defaultBranch = defaultBranch;
        this.visibility = visibility;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.size = size;
        this.topics = topics;
        this.homepage = homepage;
        this.openIssues = openIssues;
        this.htmlUrl = htmlUrl;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Map<String, Object> getOwner() { return owner; }
    public void setOwner(Map<String, Object> owner) { this.owner = owner; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public Map<String, Object> getLicense() { return license; }
    public void setLicense(Map<String, Object> license) { this.license = license; }

    public int getStars() { return stars; }
    public void setStars(int stars) { this.stars = stars; }

    public int getForks() { return forks; }
    public void setForks(int forks) { this.forks = forks; }

    public int getWatchers() { return watchers; }
    public void setWatchers(int watchers) { this.watchers = watchers; }

    public String getDefaultBranch() { return defaultBranch; }
    public void setDefaultBranch(String defaultBranch) { this.defaultBranch = defaultBranch; }

    public String getVisibility() { return visibility; }
    public void setVisibility(String visibility) { this.visibility = visibility; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }

    public int getSize() { return size; }
    public void setSize(int size) { this.size = size; }

    public List<String> getTopics() { return topics; }
    public void setTopics(List<String> topics) { this.topics = topics; }

    public String getHomepage() { return homepage; }
    public void setHomepage(String homepage) { this.homepage = homepage; }

    public int getOpenIssues() { return openIssues; }
    public void setOpenIssues(int openIssues) { this.openIssues = openIssues; }

    public String getHtmlUrl() { return htmlUrl; }
    public void setHtmlUrl(String htmlUrl) { this.htmlUrl = htmlUrl; }
}
