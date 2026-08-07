package com.javainterview.interviewhub.entity;

import com.javainterview.interviewhub.enums.ProgressStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(
        name = "user_question_progress",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_progress_user_question",
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
public class UserQuestionProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "question_id",
            nullable = false
    )
    private Question question;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private ProgressStatus status = ProgressStatus.IN_PROGRESS;

    @Column(nullable = false, updatable = false)
    private LocalDateTime firstViewedAt;

    @Column(nullable = false)
    private LocalDateTime lastViewedAt;

    private LocalDateTime completedAt;

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();

        if (firstViewedAt == null) {
            firstViewedAt = now;
        }

        if (lastViewedAt == null) {
            lastViewedAt = now;
        }

        if (status == null) {
            status = ProgressStatus.IN_PROGRESS;
        }
    }
}