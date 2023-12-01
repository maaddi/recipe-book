import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Ingredient, Unit} from "../../dtos/ingredient";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, DropdownModule],
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent {

  ingredients: Ingredient[] = [];
  ingredientActive = false;
  units = [
    { label: 'Gram', value: Unit.Gram },
    { label: 'Milliliter', value: Unit.Milliliter },
    { label: 'Tablespoon', value: Unit.Tablespoon },
    { label: 'Teaspoon', value: Unit.Teaspoon },
    { label: 'Piece', value: Unit.Piece }
  ];

  recipeForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    ingredients: [this.ingredients, Validators.required]
  });

  ingredientForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    amount: ['', Validators. required],
    unit: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) {

  }

  addIngredient(): void {
    console.log(this.units);
    if (!this.ingredientForm) {
      console.log("Invalid ingredient!");
      return;
    }
    const ingredient = this.ingredientForm.value as Ingredient;
    this.ingredients.push(ingredient);
    this.ingredientActive = false;
    console.log(this.recipeForm.value);
  }
}
