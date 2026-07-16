package com.javainterview.interviewhub.repository;

import com.javainterview.interviewhub.entity.Favorite;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository
        extends JpaRepository<Favorite, Long> {

    @EntityGraph(attributePaths = "question")
    List<Favorite>
    findAllByUser_EmailOrderByCreatedAtDesc(
            String email
    );

    boolean existsByUser_EmailAndQuestion_Id(
            String email,
            Long questionId
    );

    Optional<Favorite>
    findByUser_EmailAndQuestion_Id(
            String email,
            Long questionId
    );
}