package com.piyush.commitfm_ai.dto;

public class CommitDto {
    private String sha;
    private String message;
    private String author;
    private String date;

    public CommitDto() {}

    public CommitDto(String sha, String message, String author, String date) {
        this.sha = sha;
        this.message = message;
        this.author = author;
        this.date = date;
    }

    // Getters and Setters
    public String getSha() { return sha; }
    public void setSha(String sha) { this.sha = sha; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
}