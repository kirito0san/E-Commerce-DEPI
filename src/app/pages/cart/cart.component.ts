import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngIf
import { RouterLink } from '@angular/router';
import { MessageService } from 'src/app/service/message.service';

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
  coupon = ['ahmed', 'fady', 'anfal', 'liza', 'linda', 'hager'];
  couponIsActive = false;
  userCart!: any[];
  constructor(
    private userData: AuthServiceService,
    private showMessage: MessageService
  ) {
    let userId = JSON.parse(localStorage.getItem('user')!);
    this.userData.getUserData(userId).subscribe((data) => {
      this.userCart = data.cart || [];
      this.getTotal();
    });
    this.userId = Number(localStorage.getItem('user')) || 0;
  }
  activeCoupon(Coupon: any) {
    this.couponIsActive = this.coupon.some((e) => e == Coupon.value);
    if (this.couponIsActive) {
      this.userData.couponIsActive = true;
      this.showMessage.showSuccess('Shipping On Us 😉');
    } else {
      this.userData.couponIsActive = false;
    }
  }
  getTotal() {
    this.totalCartCost = 0;
    this.userCart.map((e) => {
      this.totalCartCost += e.price * e.quantity;
    });
  }
  deleteCart(id: any) {
    const userId = JSON.parse(localStorage.getItem('user')!); // Get user ID from local storage
    this.userCart = this.userCart.filter((item: any) => item.id !== id);
    this.userData.deleteCart(userId, this.userCart).subscribe(); // Pass userId and updated cart
  }

  quantity(event: any, item: any) {
    if (event.value >= 1) {
      item.quantity = Number(event.value);
      this.userData.saveCart(this.userId, this.userCart).subscribe(
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
    this.getTotal();
  }
}
