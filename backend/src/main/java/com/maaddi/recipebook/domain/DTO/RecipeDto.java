package com.maaddi.recipebook.domain.DTO;

import com.maaddi.recipebook.domain.DTO.requests.IngredientRequestDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDto {

    private Long id;

    @NotBlank(message = "Title must not be blank")
    private String title;

    @Size(min = 1)
    private List<IngredientDto> ingredients;

    @NotBlank(message = "Instructions must not be blank")
    private String instructions;

    private List<String> tags;
}
