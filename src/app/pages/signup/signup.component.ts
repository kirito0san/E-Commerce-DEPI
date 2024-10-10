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
/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  allEmail: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      number: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]+'),
          Validators.maxLength(14),
        ],
      ],
    });
    this.authService.getAllUser().subscribe((data) => {
      this.allEmail = data;
    });
  }
  onSubmit() {
    if (this.signupForm.valid) {
      const name = this.signupForm.get('name')?.value;
      const email = this.signupForm.get('email')?.value;
      const password = this.signupForm.get('password')?.value;
      const phoneNumber = this.signupForm.get('number')?.value;
      if (!this.allEmail.some((e) => e.email == email)) {
        this.authService
          .register({ name, email, password, phoneNumber })
          .subscribe(
            (response) => {
              console.log('Registration successful', response);
              this.router.navigate(['/login']);
            },
            (error) => {
              console.error('Error during registration', error);
            }
          );
      } else {
        alert('Email already exists');
      }
      console.log('Form Submitted', this.signupForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
