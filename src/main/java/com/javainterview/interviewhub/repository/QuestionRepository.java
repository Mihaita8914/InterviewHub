package com.javainterview.interviewhub.repository;

import com.javainterview.interviewhub.entity.Question;
import com.javainterview.interviewhub.enums.Category;
import com.javainterview.interviewhub.enums.Difficulty;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends
        JpaRepository<Question, Long>,
        JpaSpecificationExecutor<Question> {

    List<Question>
    findByTitleContainingIgnoreCaseOrQuestionContainingIgnoreCaseOrAnswerContainingIgnoreCaseOrExampleCodeContainingIgnoreCaseOrCommonMistakesContainingIgnoreCaseOrFollowUpQuestionsContainingIgnoreCase(
            String title,
            String question,
            String answer,
            String exampleCode,
            String commonMistakes,
            String followUpQuestions
    );

    List<Question> findByCategory(Category category);

    List<Question> findByDifficulty(Difficulty difficulty);

    List<Question> findByPublishedTrue();

    @Query(
            value = """
                SELECT *
                FROM questions
                WHERE published = true
                ORDER BY RANDOM()
                LIMIT 1
                """,
            nativeQuery = true
    )
    Optional<Question> findRandomPublishedQuestion();

    Page<Question> findByCategoryAndDifficultyAndPublished(
            Category category,
            Difficulty difficulty,
            Boolean published,
            Pageable pageable
    );
}