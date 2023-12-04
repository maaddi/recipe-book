package com.maaddi.recipebook.domain.DTO.load;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoadRecipesDto {

    @NotNull(message = "User id must be given for pagination")
    private Long userId;

    @NotNull(message = "Page number must be given for pagination")
    private int pageNumber;

    @NotNull(message = "Page size must be given for pagination")
    private int pageSize;
}
