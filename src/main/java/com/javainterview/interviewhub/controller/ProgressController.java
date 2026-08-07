package com.javainterview.interviewhub.controller;

import com.javainterview.interviewhub.dto.ProgressResponse;
import com.javainterview.interviewhub.dto.ProgressSummaryResponse;
import com.javainterview.interviewhub.enums.Category;
import com.javainterview.interviewhub.service.ProgressService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.javainterview.interviewhub.dto.CategoryProgressResponse;
import com.javainterview.interviewhub.dto.QuestionProgressStatusResponse;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class ProgressController {

    private final ProgressService progressService;

    @PostMapping("/{questionId}/view")
    public ResponseEntity<ProgressResponse> markAsViewed(
            @PathVariable Long questionId,
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                progressService.markAsViewed(
                        authentication.getName(),
                        questionId
                )
        );
    }

    @PostMapping("/{questionId}/complete")
    public ResponseEntity<ProgressResponse> markAsCompleted(
            @PathVariable Long questionId,
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                progressService.markAsCompleted(
                        authentication.getName(),
                        questionId
                )
        );
    }

    @GetMapping
    public ResponseEntity<List<ProgressResponse>> getProgress(
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                progressService.getProgress(
                        authentication.getName()
                )
        );
    }

    @GetMapping("/summary")
    public ResponseEntity<ProgressSummaryResponse> getSummary(
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                progressService.getSummary(
                        authentication.getName()
                )
        );
    }
    @GetMapping("/categories")
    public ResponseEntity<List<CategoryProgressResponse>> getProgressByCategory(
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                progressService.getProgressByCategory(
                        authentication.getName()
                )
        );
    }
    @GetMapping("/categories/{category}/continue")
    public ResponseEntity<ProgressResponse> getContinueQuestionByCategory(
            @PathVariable Category category,
            Authentication authentication
    ) {
        return progressService
                .getContinueQuestionByCategory(
                        authentication.getName(),
                        category
                )
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.noContent().build()
                );
    }
    @GetMapping("/last-practiced")
    public ResponseEntity<ProgressResponse> getLastPracticed(
            Authentication authentication
    ) {
        return progressService
                .getLastPracticed(authentication.getName())
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.noContent().build()
                );
    }
    @GetMapping("/{questionId}/status")
    public ResponseEntity<QuestionProgressStatusResponse> getQuestionStatus(
            @PathVariable Long questionId,
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                progressService.getQuestionStatus(
                        authentication.getName(),
                        questionId
                )
        );
    }
}