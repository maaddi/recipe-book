package com.maaddi.recipebook.mapper;

import com.maaddi.recipebook.domain.DTO.requests.IngredientRequestDto;
import com.maaddi.recipebook.domain.entities.Ingredient;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IngredientMapper {

    //Ingredient ingredientDtoToIngredient(IngredientDto ingredientDto);

    List<Ingredient> ingredientDtosToIngredients(List<IngredientRequestDto> ingredientRequestDtos);
}
