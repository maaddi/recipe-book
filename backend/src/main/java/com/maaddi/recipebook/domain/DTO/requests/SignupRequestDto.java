package com.maaddi.recipebook.domain.DTO.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignupRequestDto {

    @NotBlank(message = "Username must be not blank!")
    @Size(min = 3, max = 20)
    @Pattern(regexp = ".*[^ ].", message = "Username must not consist of whitespaces only")
    private String username;

    @NotBlank(message = "Password must be not blank!")
    @Size(min = 6, max = 40, message = "Password length be between 6 and 40 characters")
    private String password;

    @NotBlank(message = "Email must not be blank!")
    @Size(max = 50)
    @Email(message = "Email is not valid", regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
    private String email;

    private Set<String> roles;
}
