package com.javainterview.interviewhub.dto;

import com.javainterview.interviewhub.enums.Category;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CategoryProgressResponse {

    private Category category;

    private long startedQuestions;

    private long completedQuestions;

    private long inProgressQuestions;

    private int completionPercentage;
}