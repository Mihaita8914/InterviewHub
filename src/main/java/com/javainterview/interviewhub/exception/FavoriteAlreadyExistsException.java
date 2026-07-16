package com.javainterview.interviewhub.exception;

public class FavoriteAlreadyExistsException
        extends RuntimeException {

    public FavoriteAlreadyExistsException(
            Long questionId
    ) {
        super(
                "Question with id " + questionId
                        + " is already in favorites."
        );
    }
}