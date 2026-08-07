package com.javainterview.interviewhub.dto;

import com.javainterview.interviewhub.enums.ProgressStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ProgressResponse {

    private Long id;

    private QuestionResponse question;

    private ProgressStatus status;

    private LocalDateTime firstViewedAt;

    private LocalDateTime lastViewedAt;

    private LocalDateTime completedAt;
}