package com.javainterview.interviewhub.repository;

import com.javainterview.interviewhub.entity.UserQuestionProgress;
import com.javainterview.interviewhub.entity.User;
import com.javainterview.interviewhub.entity.Question;
import com.javainterview.interviewhub.enums.Category;
import com.javainterview.interviewhub.enums.ProgressStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserQuestionProgressRepository
        extends JpaRepository<UserQuestionProgress, Long> {

    Optional<UserQuestionProgress> findByUserAndQuestion(
            User user,
            Question question
    );
    Optional<UserQuestionProgress>
    findFirstByUserAndStatusAndQuestion_CategoryOrderByLastViewedAtDesc(
            User user,
            ProgressStatus status,
            Category category
    );

    Optional<UserQuestionProgress>
    findFirstByUserAndStatusOrderByLastViewedAtDesc(
            User user,
            ProgressStatus status
    );


    List<UserQuestionProgress> findByUser(User user);

    long countByUser(User user);

    long countByUserAndStatus(
            User user,
            com.javainterview.interviewhub.enums.ProgressStatus status
    );

    Optional<UserQuestionProgress> findFirstByUserOrderByLastViewedAtDesc(
            User user
    );
}