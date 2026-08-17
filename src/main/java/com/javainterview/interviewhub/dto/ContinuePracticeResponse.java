package com.javainterview.interviewhub.dto;

import com.javainterview.interviewhub.enums.Category;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ContinuePracticeResponse {

    private Category category;

    private Long questionId;

    private long index;
}