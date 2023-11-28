package com.maaddi.recipebook.controllers;

import com.maaddi.recipebook.domain.DTO.jwt.JwtResponseDto;
import com.maaddi.recipebook.domain.DTO.LoginRequestDto;
import com.maaddi.recipebook.domain.DTO.SignupRequestDto;
import com.maaddi.recipebook.domain.DTO.UserDto;
import com.maaddi.recipebook.domain.DTO.jwt.TokenRefreshRequestDto;
import com.maaddi.recipebook.domain.DTO.jwt.TokenRefreshResponseDto;
import com.maaddi.recipebook.exception.ConflictException;
import com.maaddi.recipebook.exception.ValidationException;
import com.maaddi.recipebook.mapper.UserMapper;
import com.maaddi.recipebook.services.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/auth")
public class AuthController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    private final UserService userService;

    private final UserMapper userMapper;

    public AuthController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto registerUser(@Valid @RequestBody SignupRequestDto signupRequestDto) throws ConflictException, ValidationException {
        LOGGER.info("POST /api/auth/signup body: {}", signupRequestDto);
        return userMapper.userToUserDto(userService.registerUser(signupRequestDto));
    }

    @PostMapping("/signin")
    public JwtResponseDto loginUser(@Valid @RequestBody LoginRequestDto loginRequestDto) {
        LOGGER.info("POST /api/auth/signin body: {}", loginRequestDto);
        return userService.loginUser(loginRequestDto);
    }

    @PostMapping("/refreshtoken")
    public TokenRefreshResponseDto refreshToken(@Valid @RequestBody TokenRefreshRequestDto request) {
        LOGGER.info("POST /api/auth/refreshtoken body: {}", request);
        return userService.refreshToken(request);
    }

    @PostMapping("/signout/{id}")
    public int logout(@PathVariable Long id) {
        LOGGER.info("POST /api/auth/signout");
        return userService.logout(id);
    }
}
