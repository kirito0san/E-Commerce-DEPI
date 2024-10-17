import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngIf
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  standalone: true,
})
export class FavoritesComponent implements OnInit{
  favorites!: any[];
  cart!: any[];

  constructor(
    private userData: AuthServiceService,
    private showMessage: MessageService,
    private router: Router
  ) {
    // let userId = JSON.parse(localStorage.getItem('user')!);
    // this.userData.getUserData(userId).subscribe((data) => {
    //   this.favorites = data.favorites;
    //   this.cart = data.cart || [];
    // });
  }

  ngOnInit(): void {
    const userId = JSON.parse(localStorage.getItem('user')!);
    this.userData.getUserData(userId).subscribe((data) => {
      this.favorites = data.favorites;
      this.cart = data.cart || [];
    });
  }
  AddToCart(item: any) {
    const existingCart = this.cart?.find((cart) => cart.id === item.id);
    if (!existingCart) {
      item.quantity = 1;
      this.cart?.push({ ...item });
      this.showMessage.showSuccess('Item Added To Cart');
    } else {
      this.showMessage.showInfo('Item Already In Cart');
      existingCart.quantity = existingCart.quantity || 1;
    }
    const userId = JSON.parse(localStorage.getItem('user')!);
    this.userData.saveCart(userId, this.cart).subscribe();
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
