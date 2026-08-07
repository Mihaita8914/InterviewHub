package com.javainterview.interviewhub.service;

import com.javainterview.interviewhub.dto.ProgressResponse;
import com.javainterview.interviewhub.dto.ProgressSummaryResponse;
import com.javainterview.interviewhub.entity.Question;
import com.javainterview.interviewhub.entity.User;
import com.javainterview.interviewhub.entity.UserQuestionProgress;
import com.javainterview.interviewhub.enums.ProgressStatus;
import com.javainterview.interviewhub.exception.QuestionNotFoundException;
import com.javainterview.interviewhub.mapper.QuestionMapper;
import com.javainterview.interviewhub.repository.QuestionRepository;
import com.javainterview.interviewhub.repository.UserQuestionProgressRepository;
import com.javainterview.interviewhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProgressService {

    private final UserQuestionProgressRepository progressRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;

    @Transactional
    public ProgressResponse markAsViewed(
            String email,
            Long questionId
    ) {
        User user = getUser(email);
        Question question = getPublishedQuestion(questionId);

        UserQuestionProgress progress = progressRepository
                .findByUserAndQuestion(user, question)
                .orElseGet(() ->
                        UserQuestionProgress.builder()
                                .user(user)
                                .question(question)
                                .status(ProgressStatus.IN_PROGRESS)
                                .build()
                );

        progress.setLastViewedAt(LocalDateTime.now());

        return toResponse(progressRepository.save(progress));
    }

    @Transactional
    public ProgressResponse markAsCompleted(
            String email,
            Long questionId
    ) {
        User user = getUser(email);
        Question question = getPublishedQuestion(questionId);

        UserQuestionProgress progress = progressRepository
                .findByUserAndQuestion(user, question)
                .orElseGet(() ->
                        UserQuestionProgress.builder()
                                .user(user)
                                .question(question)
                                .build()
                );

        LocalDateTime now = LocalDateTime.now();

        progress.setStatus(ProgressStatus.COMPLETED);
        progress.setLastViewedAt(now);

        if (progress.getCompletedAt() == null) {
            progress.setCompletedAt(now);
        }

        return toResponse(progressRepository.save(progress));
    }

    @Transactional(readOnly = true)
    public List<ProgressResponse> getProgress(String email) {
        User user = getUser(email);

        return progressRepository
                .findByUser(user)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProgressSummaryResponse getSummary(String email) {
        User user = getUser(email);

        long startedQuestions = progressRepository.countByUser(user);

        long completedQuestions =
                progressRepository.countByUserAndStatus(
                        user,
                        ProgressStatus.COMPLETED
                );

        long inProgressQuestions =
                progressRepository.countByUserAndStatus(
                        user,
                        ProgressStatus.IN_PROGRESS
                );

        int completionPercentage = startedQuestions == 0
                ? 0
                : (int) Math.round(
                completedQuestions * 100.0 / startedQuestions
        );

        return ProgressSummaryResponse.builder()
                .startedQuestions(startedQuestions)
                .completedQuestions(completedQuestions)
                .inProgressQuestions(inProgressQuestions)
                .completionPercentage(completionPercentage)
                .build();
    }

    @Transactional(readOnly = true)
    public Optional<ProgressResponse> getLastPracticed(
            String email
    ) {
        User user = getUser(email);

        return progressRepository
                .findFirstByUserOrderByLastViewedAtDesc(user)
                .map(this::toResponse);
    }

    private User getUser(String email) {
        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Authenticated user not found."
                        )
                );
    }

    private Question getPublishedQuestion(Long questionId) {
        return questionRepository
                .findByIdAndPublishedTrue(questionId)
                .orElseThrow(() ->
                        new QuestionNotFoundException(questionId)
                );
    }

    private ProgressResponse toResponse(
            UserQuestionProgress progress
    ) {
        return ProgressResponse.builder()
                .id(progress.getId())
                .question(
                        questionMapper.toResponse(
                                progress.getQuestion()
                        )
                )
                .status(progress.getStatus())
                .firstViewedAt(progress.getFirstViewedAt())
                .lastViewedAt(progress.getLastViewedAt())
                .completedAt(progress.getCompletedAt())
                .build();
    }
}