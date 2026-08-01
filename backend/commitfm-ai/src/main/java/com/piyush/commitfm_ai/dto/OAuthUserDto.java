package com.piyush.commitfm_ai.dto;

public class OAuthUserDto {
    private String login;
    private String name;
    private String avatarUrl;
    private int publicRepos;

    public OAuthUserDto() {}

    public OAuthUserDto(String login, String name, String avatarUrl, int publicRepos) {
        this.login = login;
        this.name = name;
        this.avatarUrl = avatarUrl;
        this.publicRepos = publicRepos;
    }

    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public int getPublicRepos() { return publicRepos; }
    public void setPublicRepos(int publicRepos) { this.publicRepos = publicRepos; }
}
