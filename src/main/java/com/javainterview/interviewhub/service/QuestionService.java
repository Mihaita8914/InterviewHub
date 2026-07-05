package com.javainterview.interviewhub.service;

import com.javainterview.interviewhub.dto.QuestionRequest;
import com.javainterview.interviewhub.dto.QuestionResponse;
import com.javainterview.interviewhub.entity.Question;
import com.javainterview.interviewhub.enums.Category;
import com.javainterview.interviewhub.enums.Difficulty;
import com.javainterview.interviewhub.exception.QuestionNotFoundException;
import com.javainterview.interviewhub.mapper.QuestionMapper;
import com.javainterview.interviewhub.repository.QuestionRepository;
import com.javainterview.interviewhub.specification.QuestionSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;

    public List<QuestionResponse> getAllQuestions() {
        return questionRepository.findAll()
                .stream()
                .map(questionMapper::toResponse)
                .toList();
    }

    public QuestionResponse createQuestion(QuestionRequest request) {
        Question question = questionMapper.toEntity(request);
        Question savedQuestion = questionRepository.save(question);
        return questionMapper.toResponse(savedQuestion);
    }

    public QuestionResponse getQuestionById(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new QuestionNotFoundException(id));

        return questionMapper.toResponse(question);
    }

    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new QuestionNotFoundException(id);
        }

        questionRepository.deleteById(id);
    }
    public QuestionResponse updateQuestion(Long id, QuestionRequest request) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new QuestionNotFoundException(id));

        question.setTitle(request.getTitle());
        question.setQuestion(request.getQuestion());
        question.setAnswer(request.getAnswer());
        question.setCategory(request.getCategory());
        question.setDifficulty(request.getDifficulty());
        question.setExampleCode(request.getExampleCode());
        question.setCommonMistakes(request.getCommonMistakes());
        question.setFollowUpQuestions(request.getFollowUpQuestions());

        if (request.getPublished() != null) {
            question.setPublished(request.getPublished());
        }

        Question updatedQuestion = questionRepository.save(question);

        return questionMapper.toResponse(updatedQuestion);
    }

    public List<QuestionResponse> searchQuestions(String keyword) {
        return questionRepository
                .findByTitleContainingIgnoreCaseOrQuestionContainingIgnoreCaseOrAnswerContainingIgnoreCase(
                        keyword,
                        keyword,
                        keyword
                )
                .stream()
                .map(questionMapper::toResponse)
                .toList();
    }

    public List<QuestionResponse> getQuestionsByCategory(Category category) {
        return questionRepository.findByCategory(category)
                .stream()
                .map(questionMapper::toResponse)
                .toList();
    }

    public List<QuestionResponse> getQuestionsByDifficulty(Difficulty difficulty) {
        return questionRepository.findByDifficulty(difficulty)
                .stream()
                .map(questionMapper::toResponse)
                .toList();
    }

    public Page<QuestionResponse> getAllQuestionsPaged(Pageable pageable) {
        return questionRepository.findAll(pageable)
                .map(questionMapper::toResponse);
    }

    public List<QuestionResponse> getPublishedQuestions() {
        return questionRepository.findByPublishedTrue()
                .stream()
                .map(questionMapper::toResponse)
                .toList();
    }
    public QuestionResponse getRandomPublishedQuestion() {
        Question question = questionRepository.findRandomPublishedQuestion()
                .orElseThrow(() -> new RuntimeException("No published questions found"));

        return questionMapper.toResponse(question);
    }

    public Page<QuestionResponse> filterQuestions(
            Category category,
            Difficulty difficulty,
            Boolean published,
            String keyword,
            Pageable pageable
    ) {
        Specification<Question> spec = Specification
                .where(QuestionSpecification.hasCategory(category))
                .and(QuestionSpecification.hasDifficulty(difficulty))
                .and(QuestionSpecification.isPublished(published))
                .and(QuestionSpecification.containsKeyword(keyword));

        return questionRepository.findAll(spec, pageable)
                .map(questionMapper::toResponse);
    }
}