package com.javainterview.interviewhub.controller;

import com.javainterview.interviewhub.dto.FavoriteResponse;
import com.javainterview.interviewhub.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class FavoriteController {

    private final FavoriteService favoriteService;

    @GetMapping
    public ResponseEntity<List<FavoriteResponse>> getFavorites(
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                favoriteService.getFavorites(authentication.getName())
        );
    }

    @PostMapping("/{questionId}")
    public ResponseEntity<FavoriteResponse> addFavorite(
            @PathVariable Long questionId,
            Authentication authentication
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        favoriteService.addFavorite(
                                authentication.getName(),
                                questionId
                        )
                );
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<Void> removeFavorite(
            @PathVariable Long questionId,
            Authentication authentication
    ) {
        favoriteService.removeFavorite(
                authentication.getName(),
                questionId
        );

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{questionId}/status")
    public ResponseEntity<Map<String, Boolean>> getFavoriteStatus(
            @PathVariable Long questionId,
            Authentication authentication
    ) {
        boolean favorite = favoriteService.isFavorite(
                authentication.getName(),
                questionId
        );

        return ResponseEntity.ok(
                Map.of("favorite", favorite)
        );
    }
}