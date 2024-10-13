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
import { MessageService } from 'src/app/service/message.service';

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
    private router: Router,
    private showMessage: MessageService
  ) {}
  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    this.authService.login().subscribe(
      (response) => {
        this.user = response.find(
          (user: any) => user.email === email && user.password === password
        );
        if (this.user) {
          this.authService.logInUser();
          this.authService.favorites = this.user.favorites || [];
          this.authService.cart = this.user.cart || [];
          localStorage.setItem('user', JSON.stringify(this.user.id));
          this.showMessage.showSuccess('Welcome Back');
          this.router.navigate(['/']);
        } else {
          this.showMessage.showError('User Doesn`t Exist');
        }
      },
      (error) => {
        this.showMessage.showError('server down');
      }
    );
  }
}
