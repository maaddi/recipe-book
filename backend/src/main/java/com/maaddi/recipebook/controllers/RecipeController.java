package com.maaddi.recipebook.controllers;

import com.maaddi.recipebook.domain.DTO.RecipeDto;
import com.maaddi.recipebook.domain.DTO.load.LoadRecipesDto;
import com.maaddi.recipebook.domain.DTO.requests.RecipeRequestDto;
import com.maaddi.recipebook.exception.NotFoundException;
import com.maaddi.recipebook.exception.ValidationException;
import com.maaddi.recipebook.mapper.RecipeMapper;
import com.maaddi.recipebook.services.RecipeService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/recipe")
public class RecipeController {

    private static final Logger LOGGER = LoggerFactory.getLogger(RecipeController.class);

    private final RecipeService recipeService;

    private final RecipeMapper recipeMapper;

    public RecipeController(RecipeService recipeService, RecipeMapper recipeMapper) {
        this.recipeService = recipeService;
        this.recipeMapper = recipeMapper;
    }

    @PostMapping( "/create")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('USER')")
    public RecipeDto create(@Valid @RequestBody RecipeRequestDto recipeRequestDto) throws ValidationException {
        LOGGER.info("POST /api/recipe/create body: {}", recipeRequestDto);
        return recipeMapper.recipeToRecipeDto(recipeService.create(recipeRequestDto));
    }

    @GetMapping("/loadAll")
    @PreAuthorize("hasRole('USER')")
    public Page<RecipeDto> loadAll(@Valid LoadRecipesDto loadRecipesDto) {
        LOGGER.info("POST /api/recipe body: {}", loadRecipesDto);
        return recipeService.loadAll(loadRecipesDto).map(recipeMapper::recipeToRecipeDto);
    }

    @GetMapping("/{id}")
    public RecipeDto loadById(@PathVariable Long id) throws NotFoundException {
        LOGGER.info("POST /api/recipe body: {}", id);
        return recipeMapper.recipeToRecipeDto(recipeService.loadById(id));
    }
}
