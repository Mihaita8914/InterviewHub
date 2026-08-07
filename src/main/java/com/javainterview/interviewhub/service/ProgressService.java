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
import com.javainterview.interviewhub.dto.QuestionProgressStatusResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import com.javainterview.interviewhub.dto.CategoryProgressResponse;
import com.javainterview.interviewhub.enums.Category;

import java.util.EnumMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProgressService {

    private final UserQuestionProgressRepository progressRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;


    @Transactional(readOnly = true)
    public QuestionProgressStatusResponse getQuestionStatus(
            String email,
            Long questionId
    ) {
        User user = getUser(email);
        Question question = getPublishedQuestion(questionId);

        return progressRepository
                .findByUserAndQuestion(user, question)
                .map(progress ->
                        QuestionProgressStatusResponse.builder()
                                .started(true)
                                .completed(
                                        progress.getStatus()
                                                == ProgressStatus.COMPLETED
                                )
                                .status(progress.getStatus())
                                .build()
                )
                .orElseGet(() ->
                        QuestionProgressStatusResponse.builder()
                                .started(false)
                                .completed(false)
                                .status(null)
                                .build()
                );
    }

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

    @Transactional(readOnly = true)
    public List<CategoryProgressResponse> getProgressByCategory(
            String email
    ) {
        User user = getUser(email);

        List<UserQuestionProgress> progressEntries =
                progressRepository.findByUser(user);

        Map<Category, List<UserQuestionProgress>> progressByCategory =
                progressEntries.stream()
                        .filter(progress ->
                                progress.getQuestion().getCategory() != null
                        )
                        .collect(
                                java.util.stream.Collectors.groupingBy(
                                        progress ->
                                                progress.getQuestion().getCategory(),
                                        () -> new EnumMap<>(Category.class),
                                        java.util.stream.Collectors.toList()
                                )
                        );

        return progressByCategory.entrySet()
                .stream()
                .map(entry -> {
                    Category category = entry.getKey();
                    List<UserQuestionProgress> categoryProgress =
                            entry.getValue();

                    long startedQuestions = categoryProgress.size();

                    long completedQuestions = categoryProgress.stream()
                            .filter(progress ->
                                    progress.getStatus()
                                            == ProgressStatus.COMPLETED
                            )
                            .count();

                    long inProgressQuestions =
                            startedQuestions - completedQuestions;

                    int completionPercentage =
                            startedQuestions == 0
                                    ? 0
                                    : (int) Math.round(
                                    completedQuestions * 100.0
                                            / startedQuestions
                            );

                    return CategoryProgressResponse.builder()
                            .category(category)
                            .startedQuestions(startedQuestions)
                            .completedQuestions(completedQuestions)
                            .inProgressQuestions(inProgressQuestions)
                            .completionPercentage(completionPercentage)
                            .build();
                })
                .sorted(
                        java.util.Comparator.comparing(
                                response ->
                                        response.getCategory().name()
                        )
                )
                .toList();
    }

    @Transactional
    public Optional<ProgressResponse> getContinueQuestionByCategory(
            String email,
            Category category
    ) {
        User user = getUser(email);

        Optional<UserQuestionProgress> inProgress =
                progressRepository
                        .findFirstByUserAndStatusAndQuestion_CategoryOrderByLastViewedAtDesc(
                                user,
                                ProgressStatus.IN_PROGRESS,
                                category
                        );

        if (inProgress.isPresent()) {
            return inProgress.map(this::toResponse);
        }

        List<Question> publishedQuestions =
                questionRepository
                        .findByCategoryAndPublishedTrueOrderByIdAsc(
                                category
                        );

        if (publishedQuestions.isEmpty()) {
            return Optional.empty();
        }

        List<UserQuestionProgress> userProgress =
                progressRepository.findByUser(user);

        java.util.Set<Long> completedQuestionIds =
                userProgress.stream()
                        .filter(progress ->
                                progress.getStatus()
                                        == ProgressStatus.COMPLETED
                        )
                        .map(progress ->
                                progress.getQuestion().getId()
                        )
                        .collect(
                                java.util.stream.Collectors.toSet()
                        );

        Optional<Question> firstNotCompleted =
                publishedQuestions.stream()
                        .filter(question ->
                                !completedQuestionIds.contains(
                                        question.getId()
                                )
                        )
                        .findFirst();

        Question questionToContinue =
                firstNotCompleted.orElse(
                        publishedQuestions.getFirst()
                );

        UserQuestionProgress progress =
                progressRepository
                        .findByUserAndQuestion(
                                user,
                                questionToContinue
                        )
                        .orElseGet(() ->
                                UserQuestionProgress.builder()
                                        .user(user)
                                        .question(questionToContinue)
                                        .status(
                                                ProgressStatus.IN_PROGRESS
                                        )
                                        .build()
                        );

        progress.setStatus(ProgressStatus.IN_PROGRESS);
        progress.setLastViewedAt(LocalDateTime.now());
        progress.setCompletedAt(null);

        return Optional.of(
                toResponse(
                        progressRepository.save(progress)
                )
        );
    }
}