import {Component, EnvironmentInjector, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from "@angular/forms";
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
import {RecipeService} from "../../services/recipe.service";
import {Recipe} from "../../dtos/recipe";
import {Router} from "@angular/router";
import {MessagesModule} from "primeng/messages";
import {Message} from "primeng/api";

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, DropdownModule, NgxEditorModule, CardModule, ToolbarModule, RadioButtonModule, SelectButtonModule, MessagesModule],
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  ingredients: Ingredient[] = [];
  ingredientActive = false;
  editor: Editor = new Editor();
  editMode = false;
  isSuccessful = false;
  isCreationFailed = false;
  successMessage: Message[] = [];
  errorMessage: Message[] = [];

  units = [
    {label: 'Gram', value: Unit.Gram},
    {label: 'Milliliter', value: Unit.Milliliter},
    {label: 'Tablespoon', value: Unit.Tablespoon},
    {label: 'Teaspoon', value: Unit.Teaspoon},
    {label: 'Piece', value: Unit.Piece}
  ];

  recipeForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    ingredients: [this.ingredients, this.validateIngredients()],
    instruction: ['', Validators.required],
    tag1: [null],
    tag2: [null],
    tag3: [null]
  });

  ingredientForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    amount: ['', Validators.required],
    unit: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private router: Router) {

  }

  ngOnInit() {
    this.successMessage = [{
      severity: 'success',
      detail: 'The recipe has been created!'
    }];
    this.errorMessage = [{
      severity: 'error',
      detail: 'Error'
    }];
  }

  onSubmit(): void {
    if (!this.recipeForm.valid || !this.validateIngredients()) {
      console.log("Invalid Recipe!");
      return
    }

    this.isCreationFailed = false;
    const tags: string[] = [this.recipeForm.value.tag1, this.recipeForm.value.tag2, this.recipeForm.value.tag3];
    const user = window.sessionStorage.getItem('auth-user');
    let userId;
    if (user) {
      userId = JSON.parse(user).id;
    }

    const recipe = {
      title: this.recipeForm.value.title,
      ingredients: this.recipeForm.value.ingredients,
      tags: tags,
      instructions: this.recipeForm.value.instruction,
      userId: userId
    } as Recipe;

    this.recipeService.createRecipe(recipe).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        setTimeout(() => {
          this.router.navigate(['/home']);}, 3000);
      },
      error: err => {
        this.errorMessage[0].detail = err.error;
        this.isCreationFailed = true;
      }
    });
  }

  addIngredient(form2: FormGroupDirective): void {
    if (!this.ingredientForm.valid) {
      console.log("Invalid ingredient!");
      return;
    }
    let ingredient = this.ingredientForm.value as Ingredient;
    ingredient.edit = false;
    this.ingredients.push(ingredient);
    this.ingredientActive = false;
    form2.resetForm();
    this.ingredientForm.reset();
  }

  removeIngredient(ingredient: Ingredient): void {
    const index = this.ingredients.indexOf(ingredient);
    this.ingredients.splice(index, 1);
  }

  changeMode(ingredient: Ingredient): void {
    ingredient.edit = !ingredient.edit;
    this.editMode = !this.editMode;
  }

  clearInput(form2: FormGroupDirective) {
    this.ingredientActive = !this.ingredientActive;
    console.log(this.ingredientForm.valid);
    form2.resetForm();
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
    this.editMode = false;
  }

  validateIngredients(): boolean {
    return this.ingredients.length != 0;
  }

  checkValue(event: any) {
    if (event.target.value <= 0 && event.target.value != "") {
      event.target.value = 1;
      this.ingredientForm.controls['amount'].setValue(1);
    }
  }

  get title() {
    return this.recipeForm.get('title');
  }

  get instructions() {
    return this.recipeForm.get('instruction');
  }

  get name() {
    return this.ingredientForm.get('name');
  }

  get amount() {
    return this.ingredientForm.get('amount');
  }

  get unit() {
    return this.ingredientForm.get('unit');
  }
}
