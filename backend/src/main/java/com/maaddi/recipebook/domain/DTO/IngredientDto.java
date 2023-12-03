package com.maaddi.recipebook.domain.DTO;

import com.maaddi.recipebook.domain.DTO.requests.RecipeRequestDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IngredientDto {
    private Long id;

    @NotBlank(message = "Ingredient name must not be blank")
    private String name;

    @NotNull(message = "Amount must not be blank")
    private int amount;

    @NotBlank(message = "Unit must not be blank")
    private String unit;
}
