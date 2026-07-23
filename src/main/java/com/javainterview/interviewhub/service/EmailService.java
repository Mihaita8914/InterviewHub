package com.javainterview.interviewhub.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    private final RestClient restClient =
            RestClient.create("https://api.resend.com");

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Value("${RESEND_API_KEY:}")
    private String resendApiKey;

    public void sendPasswordResetEmail(
            String recipientEmail,
            String token
    ) {
        String resetLink =
                frontendUrl + "/reset-password?token=" + token;

        String emailText = """
                Hello,

                We received a request to reset your InterviewHub password.

                Use the following link to choose a new password:
                %s

                This link will expire in 30 minutes and can only be used once.

                If you did not request a password reset, you can ignore this email.

                InterviewHub
                """.formatted(resetLink);

        Map<String, Object> requestBody = Map.of(
                "from", "InterviewHub <onboarding@resend.dev>",
                "to", List.of(recipientEmail),
                "subject", "Reset your InterviewHub password",
                "text", emailText
        );

        restClient
                .post()
                .uri("/emails")
                .header(
                        HttpHeaders.AUTHORIZATION,
                        "Bearer " + resendApiKey
                )
                .contentType(MediaType.APPLICATION_JSON)
                .body(requestBody)
                .retrieve()
                .toBodilessEntity();
    }
}