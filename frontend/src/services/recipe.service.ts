import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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
    return this.http.post(url, recipe);
  }

  loadAll(pageNumber: number, pageSize: number, userId: number): Observable<any> {
    const url = API_URL + 'loadAll'
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('userId', userId.toString());

    return this.http.get(url, { params });
  }

  loadById(id: number): Observable<Recipe> {
    const url = API_URL + id;
    return this.http.get<Recipe>(url);
  }
}
