import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngIf
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  standalone: true,
})

export class FavoritesComponent {
  favorites!: any[];
  cart!: any[];

  constructor(private userData: AuthServiceService, private router:Router) {
    let userId = JSON.parse(localStorage.getItem('user')!);
    this.userData.getUserData(userId).subscribe((data) => {
      this.favorites = data.favorites;
      this.cart = data.cart;
    });
  }
  AddToCart(item: any) {
    const existingCart = this.cart?.find((cart) => cart.id === item.id);
    if (!existingCart) {
      item.quantity = 1;
      this.cart?.push({ ...item });
    } else {
      existingCart.quantity = (existingCart.quantity || 0) + 1;
    }
    const userId = JSON.parse(localStorage.getItem('user')!);
    this.userData.saveCart(userId, this.cart).subscribe();
    console.log(this.cart);

  }
  deleteFavorites(id: any) {
    const userId = JSON.parse(localStorage.getItem('user')!);
    this.favorites = this.favorites.filter((item: any) => item.id !== id);
    this.userData.deleteFavorites(userId, this.favorites).subscribe();
  }

  goToProductDetails(productId: number): void {
    this.router.navigate(['/product', productId]); // Anfal
  }


}
