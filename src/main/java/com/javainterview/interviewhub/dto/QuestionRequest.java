package com.javainterview.interviewhub.dto;

import com.javainterview.interviewhub.enums.Category;
import com.javainterview.interviewhub.enums.Difficulty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must have maximum 255 characters")
    private String title;

    @NotBlank(message = "Question is required")
    @Size(max = 3000, message = "Question must have maximum 3000 characters")
    private String question;

    @NotBlank(message = "Answer is required")
    @Size(max = 10000, message = "Answer must have maximum 10000 characters")
    private String answer;

    @NotNull(message = "Category is required")
    private Category category;

    @NotNull(message = "Difficulty is required")
    private Difficulty difficulty;

    @Size(max = 10000, message = "Example code must have maximum 10000 characters")
    private String exampleCode;

    @Size(max = 5000, message = "Common mistakes must have maximum 5000 characters")
    private String commonMistakes;

    @Size(max = 5000, message = "Follow-up questions must have maximum 5000 characters")
    private String followUpQuestions;

    private Boolean published;
}