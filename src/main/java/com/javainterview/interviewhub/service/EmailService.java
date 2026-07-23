package com.javainterview.interviewhub.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Value("${spring.mail.username}")
    private String senderEmail;

    public void sendPasswordResetEmail(String recipientEmail, String token) {
        String resetLink = frontendUrl + "/reset-password?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(senderEmail);
        message.setTo(recipientEmail);
        message.setSubject("Reset your InterviewHub password");
        message.setText("""
                Hello,

                We received a request to reset your InterviewHub password.

                Use the following link to choose a new password:
                %s

                This link will expire in 30 minutes and can only be used once.

                If you did not request a password reset, you can ignore this email.

                InterviewHub
                """.formatted(resetLink));

        mailSender.send(message);
    }
}