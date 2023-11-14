package com.maaddi.recipebook.domain.DTO.jwt;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TokenRefreshRequestDto {

    @NotBlank
    private String refreshToken;
}
