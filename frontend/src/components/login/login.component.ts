import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MessagesModule} from "primeng/messages";
import {Message} from "primeng/api";
import {AuthService} from "../../services/auth.service";
import {StorageService} from "../../services/storage.service";
import {LoginRequest} from "../../dtos/login-request";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MessagesModule, ButtonModule, CardModule, InputTextModule, PaginatorModule, PasswordModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage: Message[] = [];

  constructor(private fb: FormBuilder, private authService: AuthService, private storageService: StorageService, private router: Router) {
  }

  ngOnInit(): void {
    this.errorMessage = [{
      severity: 'error',
      detail: 'error'
    }];
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      console.log("Invalid input!");
      return;
    }

    this.isLoginFailed = false;
    const loginRequest = this.loginForm.value as LoginRequest;

    this.authService.login(loginRequest).subscribe({
      next: data => {
        console.log(data);
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/home']);
        window.location.reload();
      },
      error: err => {
        console.log(err);
        this.errorMessage[0].detail = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  logout(): void {
    const user = JSON.parse(window.sessionStorage.getItem('auth-user')!);
    this.authService.logout(user.id).subscribe({
      next: data => {
        console.log(data);
        this.storageService.clean();
        this.isLoggedIn = false;
        this.isLoginFailed = false;
      },
      error: err => {
        this.errorMessage[0].detail = err.error;
      }
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
