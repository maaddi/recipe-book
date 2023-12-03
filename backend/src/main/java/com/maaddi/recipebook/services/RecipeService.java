package com.maaddi.recipebook.services;

import com.maaddi.recipebook.domain.DTO.requests.RecipeRequestDto;
import com.maaddi.recipebook.domain.entities.Recipe;
import com.maaddi.recipebook.exception.ValidationException;

public interface RecipeService {

    Recipe create(RecipeRequestDto recipeRequestDto) throws ValidationException;
}
