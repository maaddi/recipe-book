package com.maaddi.recipebook.services.impl;

import com.maaddi.recipebook.domain.DTO.SignupRequestDto;
import com.maaddi.recipebook.domain.ERole;
import com.maaddi.recipebook.domain.entities.Role;
import com.maaddi.recipebook.domain.entities.User;
import com.maaddi.recipebook.exception.ConflictException;
import com.maaddi.recipebook.exception.ValidationException;
import com.maaddi.recipebook.mapper.UserMapper;
import com.maaddi.recipebook.repository.RoleRepository;
import com.maaddi.recipebook.repository.UserRepository;
import com.maaddi.recipebook.security.jwt.JwtUtils;
import com.maaddi.recipebook.services.UserService;
import jakarta.validation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final static Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder encoder;

    private JwtUtils jwtUtils;

    private final UserMapper userMapper;

    public UserServiceImpl(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder, JwtUtils jwtUtils, UserMapper userMapper) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.userMapper = userMapper;
    }

    @Override
    public User registerUser(SignupRequestDto signupRequestDto) throws ConflictException, ValidationException {
        LOGGER.info("Trying to add a new user to the database: {}", signupRequestDto.toString());
        if (userRepository.existsByUsername(signupRequestDto.getUsername())) {
            throw new ConflictException("Error: Username is already taken!");
        }
        if (userRepository.existsByEmail(signupRequestDto.getEmail())) {
            throw new ConflictException("Error: Email is already taken!");
        }

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<User>> violations = validator.validate(userMapper.signupRequestDtoToUser(signupRequestDto));
        StringBuilder validationsMessage = new StringBuilder();
        for (ConstraintViolation<User> violation : violations) {
            validationsMessage.append(violation.getMessage()).append("\n");
        }
        if (!validationsMessage.isEmpty()) {
            throw new ValidationException(validationsMessage.toString());
        }

        User user = userMapper.signupRequestDtoToUser(signupRequestDto);
        user.setPassword(encoder.encode(user.getPassword()));
        Set<String> strRoles = signupRequestDto.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found!"));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                if (role.equals("ROLE_ADMIN")) {
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found!"));
                    roles.add(adminRole);
                } else {
                    Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found!"));
                    roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        return userRepository.save(user);
    }
}
