package com.maaddi.recipebook.domain.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IngredientDto {

    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private int amount;

    @NotBlank
    private String unit;
}
