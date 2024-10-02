import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormsModule,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
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
  constructor(private fb: FormBuilder) {}

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
  }
  // Submit method
  onSubmit() {
    if (this.signupForm.valid) {
      const name = this.signupForm.get('name')?.value;
      const email = this.signupForm.get('email')?.value;
      const password = this.signupForm.get('password')?.value;
      const phone = this.signupForm.get('number')?.value;

      console.log('Form Submitted', this.signupForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
