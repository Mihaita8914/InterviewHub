package com.javainterview.interviewhub.dto;

import com.javainterview.interviewhub.enums.Role;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponse {

    private String username;
    private String email;
    private Role role;
}