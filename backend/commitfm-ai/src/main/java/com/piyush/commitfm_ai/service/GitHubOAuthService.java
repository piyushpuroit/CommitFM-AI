package com.piyush.commitfm_ai.service;

import com.piyush.commitfm_ai.dto.OAuthUserDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class GitHubOAuthService {

    @Value("${github.client.id:}")
    private String clientId;

    @Value("${github.client.secret:}")
    private String clientSecret;

    @Value("${github.redirect.uri:http://localhost:8080/api/auth/github/callback}")
    private String redirectUri;

    private final RestTemplate restTemplate;

    public GitHubOAuthService() {
        this.restTemplate = new RestTemplate();
    }

    public String getAuthorizationUrl() {
        return "https://github.com/login/oauth/authorize?client_id=" + clientId 
             + "&redirect_uri=" + redirectUri 
             + "&scope=read:user,repo";
    }

    public String getAccessToken(String code) {
        String url = "https://github.com/login/oauth/access_token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Accept", "application/json");

        Map<String, String> body = new HashMap<>();
        body.put("client_id", clientId);
        body.put("client_secret", clientSecret);
        body.put("code", code);
        body.put("redirect_uri", redirectUri);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                request,
                new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {}
            );
            if (response.getBody() != null && response.getBody().containsKey("access_token")) {
                return (String) response.getBody().get("access_token");
            }
        } catch (Exception e) {
            System.err.println("Error exchanging code for access token: " + e.getMessage());
        }
        return null;
    }

    public OAuthUserDto getUserProfile(String accessToken) {
        String url = "https://api.github.com/user";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Accept", "application/json");

        HttpEntity<Void> request = new HttpEntity<>(headers);

        try {
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                request,
                new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {}
            );
            Map<String, Object> body = response.getBody();
            if (body != null) {
                String login = (String) body.get("login");
                String name = (String) body.get("name");
                String avatarUrl = (String) body.get("avatar_url");
                int publicRepos = body.containsKey("public_repos") ? (int) body.get("public_repos") : 0;
                return new OAuthUserDto(login, name != null ? name : login, avatarUrl, publicRepos);
            }
        } catch (Exception e) {
            System.err.println("Error fetching user profile from GitHub: " + e.getMessage());
        }
        return null;
    }
}
