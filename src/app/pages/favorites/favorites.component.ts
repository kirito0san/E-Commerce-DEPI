import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngIf

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  imports: [MatCardModule, MatButtonModule, CommonModule],
  standalone: true,
})
export class FavoritesComponent {
  favorites!: any[];
  constructor(private userData: AuthServiceService) {
    this.favorites = JSON.parse(localStorage.getItem('user')!)?.favorites;
  }
  deleteFavorites(id: any) {
    const userId = JSON.parse(localStorage.getItem('user')!)?.id; // Get user ID from local storage
    this.favorites = this.favorites.filter((item: any) => item.id !== id);
    this.userData.deleteFavorites(userId, this.favorites).subscribe(); // Pass userId and updated favorites // Update local storage
  }
}
