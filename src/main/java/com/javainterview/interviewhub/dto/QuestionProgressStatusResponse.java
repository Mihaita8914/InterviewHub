package com.javainterview.interviewhub.dto;

import com.javainterview.interviewhub.enums.ProgressStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionProgressStatusResponse {

    private boolean started;

    private boolean completed;

    private ProgressStatus status;
}