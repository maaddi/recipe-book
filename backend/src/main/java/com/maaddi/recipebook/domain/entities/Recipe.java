package com.maaddi.recipebook.domain.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "recipes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title must not be blank")
    @Size(max = 30, message = "Title length must not exceed 30 characters")
    private String title;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    @Size(min = 1)
    private List<Ingredient> ingredients;

    @NotBlank(message = "Instructions must not be blank")
    @Column(columnDefinition = "TEXT")
    private String instructions;

    @ElementCollection
    private List<String> tags;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
