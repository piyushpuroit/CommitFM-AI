package com.piyush.commitfm_ai.dto;

public class CommitDto {
    private String sha;
    private String message;
    private String authorName;
    private String authorAvatar;
    private String authorEmail;
    private String date;
    private String url;

    public CommitDto() {}

    public CommitDto(String sha, String message, String authorName, String authorAvatar, String authorEmail, String date, String url) {
        this.sha = sha;
        this.message = message;
        this.authorName = authorName;
        this.authorAvatar = authorAvatar;
        this.authorEmail = authorEmail;
        this.date = date;
        this.url = url;
    }

    public CommitDto(String sha, String message, String authorName, String date) {
        this.sha = sha;
        this.message = message;
        this.authorName = authorName;
        this.date = date;
        this.authorAvatar = "";
        this.authorEmail = "";
        this.url = "";
    }

    public String getSha() { return sha; }
    public void setSha(String sha) { this.sha = sha; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }

    public String getAuthorAvatar() { return authorAvatar; }
    public void setAuthorAvatar(String authorAvatar) { this.authorAvatar = authorAvatar; }

    public String getAuthorEmail() { return authorEmail; }
    public void setAuthorEmail(String authorEmail) { this.authorEmail = authorEmail; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}