import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {RegisterRequest} from "../../dtos/register-request";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, CardModule, ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]]
  });

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  onSubmit(): void {
    if (!this.registerForm.valid) {
      console.log("Invalid input!");
      return;
    }
    const registerRequest = this.registerForm.value as RegisterRequest;

    this.authService.register(registerRequest).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
