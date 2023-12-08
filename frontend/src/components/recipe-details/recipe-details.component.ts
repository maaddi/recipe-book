import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeService} from "../../services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {routes} from "../../app/app.routes";
import {Recipe} from "../../dtos/recipe";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule, SharedModule, TableModule, PaginatorModule],
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe?: Recipe;
  ingredients: any[] = []
  peopleAmount: number = 1;
  size: number = 10;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.recipeService.loadById(id).subscribe({
      next: data => {
        this.recipe = data;
        this.ingredients = structuredClone(this.recipe.ingredients);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  calculateIngredients() {
    let i = 0;
    for (const ingredient of this.ingredients) {
      if (this.recipe !== undefined) {
        ingredient.amount = this.recipe?.ingredients[i].amount * this.peopleAmount;
        i++;
      }
    }
  }
}
