package com.javainterview.interviewhub.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProgressSummaryResponse {

    private long startedQuestions;

    private long completedQuestions;

    private long inProgressQuestions;

    private int completionPercentage;
}