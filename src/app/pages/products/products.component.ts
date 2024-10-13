import { Component, DoCheck, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngIf
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/service/message.service';
import { filter } from 'rxjs';
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
  category: string = 'all';

  constructor(
    private data: DataService,
    private authService: AuthServiceService,
    private router: Router,
    private showMessage: MessageService
  ) {
    this.category = this.authService.category;
    const user = JSON.parse(localStorage.getItem('user')!);
    this.authService.getUserData(user).subscribe((data) => {
      this.userData = data || [];
      if (this.userData) {
        this.favorites = this.userData.favorites || [];
        this.cart = this.userData.cart || [];
      }
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (this.router.url !== '/products') {
          this.authService.category = 'all';
        }
      });
  }
  ngOnInit() {
    this.data.getAllData().subscribe((data) => {
      this.products = data;
    });
  }

  get filteredItems(): any {
    let filteredProducts = this.products;
    if (this.searchTerm) {
      filteredProducts = filteredProducts.filter((item: any) =>
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    if (this.category !== 'all') {
      filteredProducts = filteredProducts.filter((item: any) => {
        return item.category === this.category;
      });
    }

    return filteredProducts;
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
    if (this.userData) {
      this.authService.saveCart(this.userData!.id, this.cart).subscribe(
        (response) => {
          this.showMessage.showSuccess('Item Added To Cart');
        },
        (error) => {
          console.error('Error saving cart', error);
        }
      );
    } else {
      this.showMessage.showError('You Have To Login');
    }
  }
  addToFavorites(item: any) {
    const existingFavorite = this.favorites.find((fav) => fav.id === item.id);
    if (!existingFavorite) {
      item.quantity = 1;
      this.favorites.push({ ...item });
    } else {
      existingFavorite.quantity = (existingFavorite.quantity || 0) + 1;
    }
    if (this.userData) {
      this.authService
        .saveFavorites(this.userData!.id, this.favorites)
        .subscribe(
          (response) => {
            this.showMessage.showSuccess('Item Added To Favorites');
          },
          (error) => {
            console.error('Error saving favorites', error);
          }
        );
    } else {
      this.showMessage.showError('You Have To login');
    }
  }
  goToProductDetails(productId: number): void {
    this.router.navigate(['/product', productId]); // Anfal
  }
}
