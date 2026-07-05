package com.javainterview.interviewhub.dto;

import com.javainterview.interviewhub.enums.Category;
import com.javainterview.interviewhub.enums.Difficulty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class QuestionResponse {

    private Long id;
    private String title;
    private String question;
    private String answer;
    private Category category;
    private Difficulty difficulty;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String exampleCode;
    private String commonMistakes;
    private String followUpQuestions;
    private Boolean published;
}