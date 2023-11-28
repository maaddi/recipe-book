package com.maaddi.recipebook.domain.DTO.jwt;

import lombok.Data;

@Data
public class TokenRefreshResponseDto {

    private String accessToken;

    public TokenRefreshResponseDto(String accessToken) {
        this.accessToken = accessToken;
    }
}
