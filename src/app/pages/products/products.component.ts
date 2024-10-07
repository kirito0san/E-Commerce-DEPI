import { Component, DoCheck, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngIf
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';
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
  favorites: any[] = []; // Initialize as an empty array
  constructor(
    private data: DataService,
    private authService: AuthServiceService
  ) {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.favorites = parsedUser.favorites || []; // Ensure favorites is an array
    }
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
  addToFavorites(item: any) {
    const existingFavorite = this.favorites.find((fav) => fav.id === item.id);

    if (!existingFavorite) {
      item.quantity = 1;
      this.favorites.push({ ...item });
      console.log('Item added to favorites:', item);
    } else {
      existingFavorite.quantity = (existingFavorite.quantity || 0) + 1;
      console.log('Item is already in favorites');
    }

    localStorage.setItem(
      'favorites',
      JSON.stringify({ favorites: this.favorites })
    );

    this.authService
      .saveFavorites(
        JSON.parse(localStorage.getItem('user')!).id,
        this.favorites
      )
      .subscribe(
        (response) => {
          console.log('Favorites saved successfully', response);
        },
        (error) => {
          console.error('Error saving favorites', error);
        }
      );
  }
}
