package com.javainterview.interviewhub.exception;

public class FavoriteNotFoundException
        extends RuntimeException {

    public FavoriteNotFoundException(
            Long questionId
    ) {
        super(
                "Question with id " + questionId
                        + " is not in favorites."
        );
    }
}