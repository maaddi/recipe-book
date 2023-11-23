import { Routes } from '@angular/router';
import {RegisterComponent} from "../components/register/register.component";
import {LoginComponent} from "../components/login/login.component";
import {BoardAdminComponent} from "../components/board-admin/board-admin.component";
import {HomeComponent} from "../components/home/home.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'admin', component: BoardAdminComponent }
];
