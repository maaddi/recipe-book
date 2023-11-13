package com.maaddi.recipebook.controllers;

import com.maaddi.recipebook.domain.DTO.SignupRequestDto;
import com.maaddi.recipebook.domain.DTO.UserDto;
import com.maaddi.recipebook.exception.ConflictException;
import com.maaddi.recipebook.exception.ValidationException;
import com.maaddi.recipebook.mapper.UserMapper;
import com.maaddi.recipebook.repository.RoleRepository;
import com.maaddi.recipebook.repository.UserRepository;
import com.maaddi.recipebook.security.jwt.JwtUtils;
import com.maaddi.recipebook.services.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
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
}