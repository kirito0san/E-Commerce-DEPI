import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngIf
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [MatCardModule, MatButtonModule, CommonModule, RouterLink],
  standalone: true,
})
export class CartComponent {
  cart!: any[];
  totalCartCost = 0;
  userId = 0;
  constructor(private userData: AuthServiceService) {
    let userId = JSON.parse(localStorage.getItem('user')!);
    this.userData.getUserData(userId).subscribe((data) => {
      this.cart = data.cart;
      this.cart.map((e) => {
        this.totalCartCost += e.price * e.quantity;
      });
      this.userId = Number(localStorage.getItem('user')) || 0;
    });
  }
  deleteCart(id: any) {
    const userId = JSON.parse(localStorage.getItem('user')!); // Get user ID from local storage
    this.cart = this.cart.filter((item: any) => item.id !== id);
    this.userData.deleteCart(userId, this.cart).subscribe(); // Pass userId and updated cart
  }
  quantity(event: any, item: any) {
    if (event.value > 1) {
      item.quantity = Number(event.value);
      this.userData.saveCart(this.userId, this.cart).subscribe(
        (response) => {
          console.log('Favorites saved successfully', response);
        },
        (error) => {
          console.error('Error saving favorites', error);
        }
      );
    } else {
      this.deleteCart(item.id);
    }
  }
}
