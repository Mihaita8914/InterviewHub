package com.javainterview.interviewhub.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.javainterview.interviewhub.entity.Question;
import com.javainterview.interviewhub.enums.Category;
import com.javainterview.interviewhub.enums.Difficulty;
import com.javainterview.interviewhub.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final QuestionRepository questionRepository;

    @Override
    public void run(String... args) throws Exception {
        if (questionRepository.count() > 0) {
            return;
        }

        ObjectMapper objectMapper = new ObjectMapper();

        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        Resource[] resources = resolver.getResources("classpath:questions/*.json");

        List<Question> questions = new ArrayList<>();

        for (Resource resource : resources) {
            List<QuestionSeed> seeds = objectMapper.readValue(
                    resource.getInputStream(),
                    new TypeReference<>() {}
            );

            for (QuestionSeed seed : seeds) {
                questions.add(
                        Question.builder()
                                .title(seed.title())
                                .question(seed.question())
                                .answer(seed.answer())
                                .exampleCode(seed.exampleCode())
                                .commonMistakes(seed.commonMistakes())
                                .followUpQuestions(seed.followUpQuestions())
                                .category(seed.category())
                                .difficulty(seed.difficulty())
                                .published(seed.published() != null ? seed.published() : true)
                                .build()
                );
            }
        }

        questionRepository.saveAll(questions);
    }

    private record QuestionSeed(
            String title,
            String question,
            String answer,
            String exampleCode,
            String commonMistakes,
            String followUpQuestions,
            Category category,
            Difficulty difficulty,
            Boolean published
    ) {
    }
}