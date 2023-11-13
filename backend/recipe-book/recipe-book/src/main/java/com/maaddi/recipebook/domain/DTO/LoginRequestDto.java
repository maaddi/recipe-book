package com.maaddi.recipebook.domain.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginRequestDto {

    @NotBlank(message = "Username must be not blank!")
    private String username;

    @NotBlank(message = "Password must be not blank!")
    private String password;
}
