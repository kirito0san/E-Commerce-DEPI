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
import { AuthService } from 'src/app/service/auth.service';
import firebase from 'firebase/compat/app'; // Import firebase for compatibility

import 'firebase/compat/firestore'; // Import Firestore for compatibility

import { MessageService } from 'src/app/service/message.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private showMessage: MessageService,
    private authService: AuthService,
    private firestore: AngularFirestore
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
  }

  async onSubmit() {
    const name = this.signupForm.get('name')?.value;
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    const phone = this.signupForm.get('number')?.value;
    try {
      const userCredential = await this.authService.register(email, password, {
        name,
        phone,
      });
      if (userCredential && userCredential.user) {
        const uid = userCredential.user.uid;
        await this.createCartAndFavorites(uid); // Pass uid to createCartAndFavorites method
      }
      // Get the user's uid after registration

      this.showMessage.showSuccess('Registration successful!');
      this.router.navigate(['/login']);
    } catch (error) {
      this.showMessage.showError('Email Already Exist');
    }
  }

  async createCartAndFavorites(uid: string) {
    try {
      const cartRef = this.firestore.collection('carts').doc(uid);
      const cartDoc = await cartRef.get().toPromise();

      if (!cartDoc || !cartDoc.exists) {
        // If the cart document doesn't exist, create an empty cart
        await cartRef.set(
          {
            cart: firebase.firestore.FieldValue.arrayUnion(), // Create an empty array for cart items
          },
          { merge: true }
        );
      }

      const favoritesRef = this.firestore.collection('favorites').doc(uid);
      const favoritesDoc = await favoritesRef.get().toPromise();

      if (!favoritesDoc || !favoritesDoc.exists) {
        // If the favorites document doesn't exist, create an empty favorites list
        await favoritesRef.set(
          {
            favorites: firebase.firestore.FieldValue.arrayUnion(), // Create an empty array for favorites
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.error('Error creating cart and favorites:', error);
    }
  }
}
