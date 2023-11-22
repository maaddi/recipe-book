package com.maaddi.recipebook.services;

import com.maaddi.recipebook.domain.DTO.jwt.JwtResponseDto;
import com.maaddi.recipebook.domain.DTO.LoginRequestDto;
import com.maaddi.recipebook.domain.DTO.SignupRequestDto;
import com.maaddi.recipebook.domain.DTO.jwt.TokenRefreshRequestDto;
import com.maaddi.recipebook.domain.DTO.jwt.TokenRefreshResponseDto;
import com.maaddi.recipebook.domain.entities.User;
import com.maaddi.recipebook.exception.ConflictException;
import com.maaddi.recipebook.exception.ValidationException;

public interface UserService {

    User registerUser(SignupRequestDto signupRequestDto) throws ConflictException, ValidationException;

    JwtResponseDto loginUser(LoginRequestDto loginRequestDto);

    TokenRefreshResponseDto refreshtoken(TokenRefreshRequestDto request);
}