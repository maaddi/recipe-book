package com.maaddi.recipebook.domain.DTO.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecipeRequestDto {

    private Long id;

    @NotBlank(message = "Title must not be blank")
    private String title;

    @Size(min = 1)
    private List<IngredientRequestDto> ingredients;

    @NotBlank(message = "Instructions must not be blank")
    private String instructions;

    private List<String> tags;

    @NotNull
    private Long userId;
}
