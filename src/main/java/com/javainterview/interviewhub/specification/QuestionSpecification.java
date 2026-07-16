package com.javainterview.interviewhub.specification;

import com.javainterview.interviewhub.entity.Question;
import com.javainterview.interviewhub.enums.Category;
import com.javainterview.interviewhub.enums.Difficulty;
import org.springframework.data.jpa.domain.Specification;

public final class QuestionSpecification {

    private QuestionSpecification() {
    }

    public static Specification<Question> hasCategory(Category category) {
        return (root, query, criteriaBuilder) -> {
            if (category == null) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.equal(
                    root.get("category"),
                    category
            );
        };
    }

    public static Specification<Question> hasDifficulty(Difficulty difficulty) {
        return (root, query, criteriaBuilder) -> {
            if (difficulty == null) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.equal(
                    root.get("difficulty"),
                    difficulty
            );
        };
    }

    public static Specification<Question> isPublished(Boolean published) {
        return (root, query, criteriaBuilder) -> {
            if (published == null) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.equal(
                    root.get("published"),
                    published
            );
        };
    }

    public static Specification<Question> containsKeyword(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if (keyword == null || keyword.isBlank()) {
                return criteriaBuilder.conjunction();
            }

            String likePattern =
                    "%" + keyword.trim().toLowerCase() + "%";

            return criteriaBuilder.or(
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("title")),
                            likePattern
                    ),
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("question")),
                            likePattern
                    ),
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("answer")),
                            likePattern
                    ),
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("exampleCode")),
                            likePattern
                    ),
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("commonMistakes")),
                            likePattern
                    ),
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("followUpQuestions")),
                            likePattern
                    )
            );
        };
    }
}