import { Component, OnInit } from '@angular/core';
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
export class CartComponent implements OnInit {
  favorites!: any[];
  cart!: any[];
  constructor(private data: AuthServiceService) {
    this.cart = this.data.cart;
    this.favorites = JSON.parse(localStorage.getItem('user')!)?.favorites || [];
    console.log(this.cart);
    console.log(this.favorites);
  }
  ngOnInit(): void {
    this.cart = this.data.cart;
    this.favorites = JSON.parse(localStorage.getItem('user')!)?.favorites;
    console.log(this.cart);
    console.log(this.favorites);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
