package com.javainterview.interviewhub.service;

import com.javainterview.interviewhub.dto.FavoriteResponse;
import com.javainterview.interviewhub.entity.Favorite;
import com.javainterview.interviewhub.entity.Question;
import com.javainterview.interviewhub.entity.User;
import com.javainterview.interviewhub.exception.FavoriteAlreadyExistsException;
import com.javainterview.interviewhub.exception.FavoriteNotFoundException;
import com.javainterview.interviewhub.exception.QuestionNotFoundException;
import com.javainterview.interviewhub.mapper.QuestionMapper;
import com.javainterview.interviewhub.repository.FavoriteRepository;
import com.javainterview.interviewhub.repository.QuestionRepository;
import com.javainterview.interviewhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;

    @Transactional(readOnly = true)
    public List<FavoriteResponse> getFavorites(String email) {
        return favoriteRepository
                .findAllByUser_EmailOrderByCreatedAtDesc(email)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public FavoriteResponse addFavorite(String email, Long questionId) {
        if (favoriteRepository.existsByUser_EmailAndQuestion_Id(email, questionId)) {
            throw new FavoriteAlreadyExistsException(questionId);
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Authenticated user not found.")
                );

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new QuestionNotFoundException(questionId));

        if (!Boolean.TRUE.equals(question.getPublished())) {
            throw new QuestionNotFoundException(questionId);
        }

        Favorite favorite = Favorite.builder()
                .user(user)
                .question(question)
                .build();

        return toResponse(favoriteRepository.save(favorite));
    }

    @Transactional
    public void removeFavorite(String email, Long questionId) {
        Favorite favorite = favoriteRepository
                .findByUser_EmailAndQuestion_Id(email, questionId)
                .orElseThrow(() -> new FavoriteNotFoundException(questionId));

        favoriteRepository.delete(favorite);
    }

    @Transactional(readOnly = true)
    public boolean isFavorite(String email, Long questionId) {
        return favoriteRepository
                .existsByUser_EmailAndQuestion_Id(email, questionId);
    }

    private FavoriteResponse toResponse(Favorite favorite) {
        return FavoriteResponse.builder()
                .id(favorite.getId())
                .question(questionMapper.toResponse(favorite.getQuestion()))
                .createdAt(favorite.getCreatedAt())
                .build();
    }
}