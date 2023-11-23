import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginRequest} from "../dtos/login-request";
import {Observable} from "rxjs";
import {RegisterRequest} from "../dtos/register-request";
import {User} from "../dtos/user";

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<User> {
    const url = AUTH_API + 'signin';
    return this.http.post<User>(url, loginRequest, httpOptions);
  }

  register(registerRequest: RegisterRequest): Observable<any> {
    const url = AUTH_API + 'signup';
    return this.http.post(url, registerRequest, httpOptions);
  }

  logout(): Observable<any> {
    const url = AUTH_API + 'signout';
    return this.http.post(url, httpOptions);
  }
}
