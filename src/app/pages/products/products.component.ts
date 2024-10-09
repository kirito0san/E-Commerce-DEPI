import { Component, DoCheck, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngIf
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';
interface Product {
  id: number;
  name: string;
  email: string;
  cart?: any[]; // Change from number to any[] to represent an array of cart items
  password: string;
  favorites?: any[]; // Change from string to any[] to represent an array of favorite items
  phoneNumber: string;
  quantity?: number;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
  ],
  standalone: true,
})
export class ProductsComponent implements OnInit, DoCheck {
  products: any = [];
  searchTerm: string = '';
  favorites: any[] = []; // Change from [] to any[] for proper typing
  cart: any[] = []; // Change from [] to any[] for proper typing
  userData: Product | undefined;
  constructor(
    private data: DataService,
    private authService: AuthServiceService
  ) {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.authService.getUserData(user).subscribe((data) => {
      this.userData = data;
      if (this.userData) {
        this.favorites = this.userData.favorites || []; // Ensure favorites is an array
        this.cart = this.userData.cart || []; // Ensure cart is an arra
      }
    });
  }
  ngOnInit() {
    this.data.getAllData().subscribe((data) => {
      this.products = data;
    });
  }
  get filteredItems(): any {
    if (!this.searchTerm) {
      return this.products;
    }
    return this.products.filter((item: any) =>
      item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  ngDoCheck(): void {
    if (this.data.searchResult) {
      this.searchTerm = this.data.searchResult;
      this.data.searchResult = '';
    }
  }
  addToCart(item: any) {
    const existingCart = this.cart.find((cart) => cart.id === item.id);
    if (!existingCart) {
      item.quantity = 1;
      this.cart.push({ ...item });
    } else {
      existingCart.quantity = (existingCart.quantity || 0) + 1;
    }
    this.authService.saveCart(this.userData!.id, this.cart).subscribe(
      (response) => {
        console.log('Favorites saved successfully', response);
      },
      (error) => {
        console.error('Error saving favorites', error);
      }
    );
  }
  addToFavorites(item: any) {
    const existingFavorite = this.favorites.find((fav) => fav.id === item.id);
    if (!existingFavorite) {
      item.quantity = 1;
      this.favorites.push({ ...item });
    } else {
      existingFavorite.quantity = (existingFavorite.quantity || 0) + 1;
    }
    this.authService.saveFavorites(this.userData!.id, this.favorites).subscribe(
      (response) => {
        console.log('Favorites saved successfully', response);
      },
      (error) => {
        console.error('Error saving favorites', error);
      }
    );
  }
}
