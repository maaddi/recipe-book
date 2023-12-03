package com.maaddi.recipebook.domain.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecipeDto {

    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private List<IngredientDto> ingredients;

    @NotBlank
    private String instructions;

    private List<String> tags;
}
