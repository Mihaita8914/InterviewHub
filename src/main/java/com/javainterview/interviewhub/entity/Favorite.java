package com.javainterview.interviewhub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(
        name = "favorites",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_favorite_user_question",
                        columnNames = {
                                "user_id",
                                "question_id"
                        }
                )
        }
)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(
            name = "question_id",
            nullable = false
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Question question;

    @CreationTimestamp
    @Column(
            nullable = false,
            updatable = false
    )
    private LocalDateTime createdAt;
}