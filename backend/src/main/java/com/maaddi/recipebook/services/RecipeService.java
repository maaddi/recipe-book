package com.maaddi.recipebook.services;

import com.maaddi.recipebook.domain.DTO.load.LoadRecipesDto;
import com.maaddi.recipebook.domain.DTO.requests.RecipeRequestDto;
import com.maaddi.recipebook.domain.entities.Recipe;
import com.maaddi.recipebook.exception.NotFoundException;
import com.maaddi.recipebook.exception.ValidationException;
import org.springframework.data.domain.Page;

public interface RecipeService {

    Recipe create(RecipeRequestDto recipeRequestDto) throws ValidationException;

    Page<Recipe> loadAll(LoadRecipesDto loadRecipesDto);

    Recipe loadById(Long id) throws NotFoundException;
}
