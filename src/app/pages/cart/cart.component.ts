import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngIf

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [MatCardModule, MatButtonModule, CommonModule],
  standalone: true,
})
export class CartComponent {
  cart!: any[];
  constructor(private userData: AuthServiceService) {
    let userId = JSON.parse(localStorage.getItem('user')!);
    this.userData.getUserData(userId).subscribe((data) => {
      this.cart = data.cart;
    });
  }
  deleteCart(id: any) {
    const userId = JSON.parse(localStorage.getItem('user')!); // Get user ID from local storage
    this.cart = this.cart.filter((item: any) => item.id !== id);
    this.userData.deleteCart(userId, this.cart).subscribe(); // Pass userId and updated cart
  }
}
