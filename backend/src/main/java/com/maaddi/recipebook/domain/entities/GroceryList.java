package com.maaddi.recipebook.domain.entities;

import com.maaddi.recipebook.domain.DTO.UserDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "groceryLists")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroceryList {

    @Id
    private Long id;

    /*@OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Map<String, Integer> ingredients;*/
}
