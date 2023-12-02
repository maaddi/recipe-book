import {Component, EnvironmentInjector, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Ingredient, Unit} from "../../dtos/ingredient";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {EditorModule} from "primeng/editor";
import {Editor, NgxEditorModule} from "ngx-editor";
import {CardModule} from "primeng/card";
import {ToolbarModule} from "primeng/toolbar";
import {v4 as uuidv4} from 'uuid';
import {RadioButtonModule} from "primeng/radiobutton";
import {SelectButtonModule} from "primeng/selectbutton";

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, DropdownModule, NgxEditorModule, CardModule, ToolbarModule, RadioButtonModule, SelectButtonModule],
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent {

  ingredients: Ingredient[] = [];
  ingredientActive = false;
  editor: Editor = new Editor();

  units = [
    {label: 'Gram', value: Unit.Gram},
    {label: 'Milliliter', value: Unit.Milliliter},
    {label: 'Tablespoon', value: Unit.Tablespoon},
    {label: 'Teaspoon', value: Unit.Teaspoon},
    {label: 'Piece', value: Unit.Piece}
  ];

  recipeForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    ingredients: [this.ingredients, Validators.required],
    instruction: ['', Validators.required],
    tag1: [''],
    tag2: [''],
    tag3: ['']
  });

  ingredientForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    amount: ['', Validators.required],
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
    let ingredient = this.ingredientForm.value as Ingredient;
    ingredient.edit = false;
    this.ingredients.push(ingredient);
    this.ingredientActive = false;
    this.ingredientForm.reset();
  }

  removeIngredient(ingredient: Ingredient): void {
    const index = this.ingredients.indexOf(ingredient);
    this.ingredients.splice(index, 1);
  }

  changeMode(ingredient: Ingredient): void {
    ingredient.edit = !ingredient.edit;
  }

  clearInput() {
    this.ingredientActive = !this.ingredientActive;
    this.ingredientForm.reset();
  }

  changeIngredient(ingredient: Ingredient): void {
    const index = this.ingredients.indexOf(ingredient);
    if (this.ingredientForm.value.name != null) {
      this.ingredients[index].name = this.ingredientForm.value.name;
    }
    if (this.ingredientForm.value.amount != null) {
      this.ingredients[index].amount = this.ingredientForm.value.amount;
    }
    if (this.ingredientForm.value.unit != null) {
      this.ingredients[index].unit = this.ingredientForm.value.unit;
    }
    this.ingredients[index].edit = false;
    this.ingredientForm.reset();
  }
}
