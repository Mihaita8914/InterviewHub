package com.javainterview.interviewhub.entity;

import com.javainterview.interviewhub.enums.Category;
import com.javainterview.interviewhub.enums.Difficulty;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "questions")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 3000)
    private String question;

    @Column(length = 10000)
    private String answer;

    @Column(length = 10000)
    private String exampleCode;

    @Column(length = 5000)
    private String commonMistakes;

    @Column(length = 5000)
    private String followUpQuestions;

    @Column(nullable = false)
    @Builder.Default
    private Boolean published = false;


    @Enumerated(EnumType.STRING)
    private Category category;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;


}