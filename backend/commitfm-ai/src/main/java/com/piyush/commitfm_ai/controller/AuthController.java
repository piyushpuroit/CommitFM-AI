package com.piyush.commitfm_ai.controller;

import com.piyush.commitfm_ai.dto.OAuthUserDto;
import com.piyush.commitfm_ai.service.GitHubOAuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${frontend.url:http://localhost:5173}", allowCredentials = "true")
public class AuthController {

    private final GitHubOAuthService oauthService;

    @Value("${frontend.url:http://localhost:5173}")
    private String frontendUrl;

    public AuthController(GitHubOAuthService oauthService) {
        this.oauthService = oauthService;
    }

    @GetMapping("/github/login")
    public void login(HttpServletResponse response) throws IOException {
        String authUrl = oauthService.getAuthorizationUrl();
        response.sendRedirect(authUrl);
    }

    @GetMapping("/github/callback")
    public void callback(@RequestParam("code") String code, HttpSession session, HttpServletResponse response) throws IOException {
        String accessToken = oauthService.getAccessToken(code);
        if (accessToken != null) {
            OAuthUserDto profile = oauthService.getUserProfile(accessToken);
            if (profile != null) {
                session.setAttribute("user", profile);
                session.setAttribute("accessToken", accessToken);
                response.sendRedirect(frontendUrl + "/repositories?auth=success");
                return;
            }
        }
        response.sendRedirect(frontendUrl + "/?auth=failed");
    }

    @GetMapping("/me")
    public ResponseEntity<OAuthUserDto> me(HttpSession session) {
        OAuthUserDto user = (OAuthUserDto) session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok().build();
    }
}
