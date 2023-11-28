import { Routes } from '@angular/router';
import {RegisterComponent} from "../components/register/register.component";
import {LoginComponent} from "../components/login/login.component";
import {BoardAdminComponent} from "../components/board-admin/board-admin.component";
import {HomeComponent} from "../components/home/home.component";
import {isLoggedInGuard} from "./is-logged-in.guard";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: RegisterComponent, canActivate: [isLoggedInGuard] },
  { path: 'signin', component: LoginComponent, canActivate: [isLoggedInGuard] },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', component: LoginComponent, canActivate: [isLoggedInGuard] }
];
