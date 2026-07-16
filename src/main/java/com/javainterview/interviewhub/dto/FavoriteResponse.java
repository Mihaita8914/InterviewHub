package com.javainterview.interviewhub.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class FavoriteResponse {

    private Long id;

    private QuestionResponse question;

    private LocalDateTime createdAt;
}