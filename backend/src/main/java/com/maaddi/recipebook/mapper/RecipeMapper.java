package com.maaddi.recipebook.mapper;

import com.maaddi.recipebook.domain.DTO.RecipeDto;
import com.maaddi.recipebook.domain.DTO.requests.RecipeRequestDto;
import com.maaddi.recipebook.domain.entities.Recipe;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RecipeMapper {

    Recipe recipeRequestDtoToRecipe(RecipeRequestDto recipeRequestDto);

    RecipeRequestDto recipeToRecipeRequestDto(Recipe recipe);

    RecipeDto recipeToRecipeDto(Recipe recipe);
}
