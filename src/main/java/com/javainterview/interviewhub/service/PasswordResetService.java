package com.javainterview.interviewhub.service;

import com.javainterview.interviewhub.entity.PasswordResetToken;
import com.javainterview.interviewhub.entity.User;
import com.javainterview.interviewhub.repository.PasswordResetTokenRepository;
import com.javainterview.interviewhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HexFormat;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@RequiredArgsConstructor
@Service
public class PasswordResetService {

    private static final int TOKEN_EXPIRATION_MINUTES = 30;

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    private final SecureRandom secureRandom = new SecureRandom();

    @Transactional
    public void requestPasswordReset(String email) {
        userRepository.findByEmail(email)
                .filter(User::getEnabled)
                .ifPresent(user -> {
                    tokenRepository.deleteAllByUser(user);

                    String rawToken = generateToken();

                    PasswordResetToken passwordResetToken =
                            PasswordResetToken.builder()
                                    .tokenHash(hashToken(rawToken))
                                    .user(user)
                                    .expiresAt(
                                            LocalDateTime.now()
                                                    .plusMinutes(TOKEN_EXPIRATION_MINUTES)
                                    )
                                    .build();

                    tokenRepository.save(passwordResetToken);
                    emailService.sendPasswordResetEmail(
                            user.getEmail(),
                            rawToken
                    );
                });
    }

    @Transactional
    public void resetPassword(String rawToken, String newPassword) {
        String tokenHash = hashToken(rawToken);

        PasswordResetToken passwordResetToken =
                tokenRepository.findByTokenHash(tokenHash)
                        .orElseThrow(this::invalidTokenException);

        if (passwordResetToken.isUsed()
                || passwordResetToken.isExpired()) {
            throw invalidTokenException();
        }

        User user = passwordResetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        passwordResetToken.setUsedAt(LocalDateTime.now());
        tokenRepository.save(passwordResetToken);
    }

    private String generateToken() {
        byte[] tokenBytes = new byte[32];
        secureRandom.nextBytes(tokenBytes);

        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(tokenBytes);
    }

    private String hashToken(String rawToken) {
        try {
            MessageDigest digest =
                    MessageDigest.getInstance("SHA-256");

            byte[] hash = digest.digest(
                    rawToken.getBytes(StandardCharsets.UTF_8)
            );

            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException(
                    "SHA-256 algorithm is unavailable",
                    exception
            );
        }
    }

    private ResponseStatusException invalidTokenException() {
        return new ResponseStatusException(
                BAD_REQUEST,
                "The password reset link is invalid or has expired"
        );
    }
}