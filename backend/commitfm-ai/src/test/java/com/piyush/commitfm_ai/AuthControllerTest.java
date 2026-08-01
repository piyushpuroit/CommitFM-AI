package com.piyush.commitfm_ai;

import com.piyush.commitfm_ai.controller.AuthController;
import com.piyush.commitfm_ai.service.GitHubOAuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class AuthControllerTest {

    @Autowired
    private AuthController authController;

    @Autowired
    private GitHubOAuthService oauthService;

    @Test
    public void testAuthComponentsLoaded() {
        assertNotNull(authController);
        assertNotNull(oauthService);
    }

    @Test
    public void testGithubLoginRedirectUrl() {
        String authUrl = oauthService.getAuthorizationUrl();
        assertNotNull(authUrl);
        assertTrue(authUrl.startsWith("https://github.com/login/oauth/authorize"));
        assertTrue(authUrl.contains("client_id="));
        assertTrue(authUrl.contains("redirect_uri="));
        assertTrue(authUrl.contains("scope="));
    }
}
