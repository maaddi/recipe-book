package com.maaddi.recipebook.services.impl;

import com.maaddi.recipebook.domain.DTO.load.LoadRecipesDto;
import com.maaddi.recipebook.domain.DTO.requests.RecipeRequestDto;
import com.maaddi.recipebook.domain.entities.Ingredient;
import com.maaddi.recipebook.domain.entities.Recipe;
import com.maaddi.recipebook.domain.entities.User;
import com.maaddi.recipebook.exception.ValidationException;
import com.maaddi.recipebook.mapper.IngredientMapper;
import com.maaddi.recipebook.mapper.RecipeMapper;
import com.maaddi.recipebook.repository.RecipeRepository;
import com.maaddi.recipebook.repository.UserRepository;
import com.maaddi.recipebook.services.RecipeService;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class RecipeServiceImpl implements RecipeService {

    private final static Logger LOGGER = LoggerFactory.getLogger(RecipeServiceImpl.class);

    private final RecipeRepository recipeRepository;

    private final RecipeMapper recipeMapper;

    private final IngredientMapper ingredientMapper;

    private final UserRepository userRepository;

    public RecipeServiceImpl(RecipeRepository recipeRepository, RecipeMapper recipeMapper, IngredientMapper ingredientMapper, UserRepository userRepository) {
        this.recipeRepository = recipeRepository;
        this.recipeMapper = recipeMapper;
        this.ingredientMapper = ingredientMapper;
        this.userRepository = userRepository;
    }

    @Override
    public Recipe create(RecipeRequestDto recipeRequestDto) throws ValidationException {
        LOGGER.info("Trying to add a new recipe to the database: {}", recipeRequestDto.toString());

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Recipe>> violations = validator.validate(recipeMapper.recipeRequestDtoToRecipe(recipeRequestDto));
        StringBuilder validationsMessage = new StringBuilder();
        for (ConstraintViolation<Recipe> violation : violations) {
            validationsMessage.append(violation.getMessage()).append("\n");
        }
        if (!validationsMessage.isEmpty()) {
            throw new ValidationException(validationsMessage.toString());
        }

        Recipe recipe = recipeMapper.recipeRequestDtoToRecipe(recipeRequestDto);
        Optional<User> user = userRepository.findById(recipeRequestDto.getUserId());
        if (user.isPresent()) {
            recipe.setUser(user.get());
        }

        List<Ingredient> ingredients = new ArrayList<>();

        for (Ingredient ingredient: ingredientMapper.ingredientDtosToIngredients(recipeRequestDto.getIngredients())) {
            ingredient.setRecipe(recipe);
            ingredients.add(ingredient);
        }

        recipe.setIngredients(ingredients);

        return recipeRepository.save(recipe);
    }

    @Override
    public Page<Recipe> loadAll(LoadRecipesDto loadRecipesDto) {
        LOGGER.info("Trying to retrieve page: {}", loadRecipesDto.getPageNumber());

        Pageable page = PageRequest.of(loadRecipesDto.getPageNumber(), loadRecipesDto.getPageSize());

        return recipeRepository.findAllByUserId(loadRecipesDto.getUserId(), page);
    }
}
