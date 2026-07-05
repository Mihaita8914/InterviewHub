package com.javainterview.interviewhub.mapper;

import com.javainterview.interviewhub.dto.QuestionRequest;
import com.javainterview.interviewhub.dto.QuestionResponse;
import com.javainterview.interviewhub.entity.Question;
import org.springframework.stereotype.Component;

@Component
public class QuestionMapper {

    public Question toEntity(QuestionRequest request) {
        return Question.builder()
                .title(request.getTitle())
                .question(request.getQuestion())
                .answer(request.getAnswer())
                .category(request.getCategory())
                .difficulty(request.getDifficulty())
                .exampleCode(request.getExampleCode())
                .commonMistakes(request.getCommonMistakes())
                .followUpQuestions(request.getFollowUpQuestions())
                .published(request.getPublished() != null ? request.getPublished() : false)
                .build();
    }

    public QuestionResponse toResponse(Question question) {
        return QuestionResponse.builder()
                .id(question.getId())
                .title(question.getTitle())
                .question(question.getQuestion())
                .answer(question.getAnswer())
                .category(question.getCategory())
                .difficulty(question.getDifficulty())
                .createdAt(question.getCreatedAt())
                .updatedAt(question.getUpdatedAt())
                .exampleCode(question.getExampleCode())
                .commonMistakes(question.getCommonMistakes())
                .followUpQuestions(question.getFollowUpQuestions())
                .published(question.getPublished())
                .build();
    }
}