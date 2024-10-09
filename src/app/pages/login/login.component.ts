import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormsModule,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  usersData: any = null;
  user: any = null;
  signupForm!: FormGroup;
  login: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {
    this.authService.getAllUser().subscribe((data) => {
      this.usersData = data;
    });
  }
  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    if (this.signupForm.valid) {
      const email = this.signupForm.get('email')?.value;
      const password = this.signupForm.get('password')?.value;
      this.authService.login().subscribe(
        (response) => {
          this.user = this.usersData.find(
            (user: any) => user.email === email && user.password === password
          );
          if (this.user) {
            this.authService.logInIcon();
            this.authService.favorites = this.user.favorites;
            this.authService.cart = this.user.cart;
            localStorage.setItem('user', JSON.stringify(this.user.id));
            this.router.navigate(['/']);
            console.log('Login successful', response);
          } else {
            alert('cheek the email or password');
          }
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
      console.log('Form Submitted', this.signupForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
