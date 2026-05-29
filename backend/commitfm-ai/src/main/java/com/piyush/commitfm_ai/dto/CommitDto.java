package com.piyush.commitfm_ai.dto;

public class CommitDto {

    private String id;
    private String message;
    private String date;

    public CommitDto(String id, String message, String date) {
        this.id = id;
        this.message = message;
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public String getDate() {
        return date;
    }
}