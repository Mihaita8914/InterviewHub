package com.javainterview.interviewhub.repository;

import com.javainterview.interviewhub.entity.PasswordResetToken;
import com.javainterview.interviewhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository
        extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByTokenHash(String tokenHash);

    void deleteAllByUser(User user);
}