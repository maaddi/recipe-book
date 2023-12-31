import { Routes } from '@angular/router';
import {RegisterComponent} from "../components/register/register.component";
import {LoginComponent} from "../components/login/login.component";
import {BoardAdminComponent} from "../components/board-admin/board-admin.component";
import {HomeComponent} from "../components/home/home.component";
import {isLoggedInGuard} from "./is-logged-in.guard";
import {authGuard} from "./auth.guard";
import {UserDetailsComponent} from "../components/user-details/user-details.component";
import {CreateRecipeComponent} from "../components/create-recipe/create-recipe.component";
import {RecipeDetailsComponent} from "../components/recipe-details/recipe-details.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin', component: BoardAdminComponent, canActivate: [authGuard] },
  { path: 'userDetails', component: UserDetailsComponent, canActivate: [authGuard] },
  { path: 'createRecipe', component: CreateRecipeComponent, canActivate: [authGuard] },
  { path: 'recipeDetails/:id', component: RecipeDetailsComponent, canActivate: [authGuard] },
  { path: 'signup', component: RegisterComponent, canActivate: [isLoggedInGuard] },
  { path: 'signin', component: LoginComponent, canActivate: [isLoggedInGuard] },
  { path: '', component: LoginComponent, canActivate: [isLoggedInGuard] }
];
