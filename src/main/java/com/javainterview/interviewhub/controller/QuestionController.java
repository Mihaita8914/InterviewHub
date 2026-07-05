package com.javainterview.interviewhub.controller;

import com.javainterview.interviewhub.dto.QuestionRequest;
import com.javainterview.interviewhub.dto.QuestionResponse;
import com.javainterview.interviewhub.enums.Category;
import com.javainterview.interviewhub.enums.Difficulty;
import com.javainterview.interviewhub.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping
    public ResponseEntity<Page<QuestionResponse>> getAllQuestions(Pageable pageable) {
        return ResponseEntity.ok(questionService.getAllQuestionsPaged(pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<List<QuestionResponse>> searchQuestions(@RequestParam String keyword) {
        return ResponseEntity.ok(questionService.searchQuestions(keyword));
    }
    @GetMapping("/category/{category}")
    public ResponseEntity<List<QuestionResponse>> getQuestionsByCategory(@PathVariable Category category) {
        return ResponseEntity.ok(questionService.getQuestionsByCategory(category));
    }
    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<List<QuestionResponse>> getQuestionsByDifficulty(@PathVariable Difficulty difficulty) {
        return ResponseEntity.ok(questionService.getQuestionsByDifficulty(difficulty));
    }

    @GetMapping("/published")
    public ResponseEntity<List<QuestionResponse>> getPublishedQuestions() {
        return ResponseEntity.ok(questionService.getPublishedQuestions());
    }

    @GetMapping("/random")
    public ResponseEntity<QuestionResponse> getRandomPublishedQuestion() {
        return ResponseEntity.ok(questionService.getRandomPublishedQuestion());
    }

    @PostMapping
    public ResponseEntity<QuestionResponse> createQuestion(@Valid @RequestBody QuestionRequest request) {
        QuestionResponse response = questionService.createQuestion(request);
        return ResponseEntity.status(201).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<QuestionResponse> updateQuestion(
            @PathVariable Long id,
            @Valid @RequestBody QuestionRequest request
    ) {
        return ResponseEntity.ok(questionService.updateQuestion(id, request));
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<QuestionResponse>> filterQuestions(
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) Difficulty difficulty,
            @RequestParam(required = false) Boolean published,
            @RequestParam(required = false) String keyword,
            Pageable pageable
    ) {
        return ResponseEntity.ok(
                questionService.filterQuestions(category, difficulty, published, keyword, pageable)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionResponse> getQuestionById(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.getQuestionById(id));
    }
}