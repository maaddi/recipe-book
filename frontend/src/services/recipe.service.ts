import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recipe} from "../dtos/recipe";

const API_URL = 'http://localhost:8080/api/recipe/';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  createRecipe(recipe: Recipe): Observable<any> {
    const url = API_URL + 'create';
    console.log(recipe);
    return this.http.post<Recipe>(url, recipe);
  }
}
