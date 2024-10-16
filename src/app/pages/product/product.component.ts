import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'src/app/service/message.service';
interface Product {
  id: number | null | undefined;
  title: string | null | undefined;
  description: string | null | undefined;
  price: number | null | undefined;
  image: string | null;
  rating:
    | {
        rate: number | null | undefined;
        count: number | null | undefined;
      }
    | null
    | undefined;
  quantity: any;
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  productDetails!: Product;
  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL'];
  selectedSize: string = '';
  isFavorites: boolean = false;
  cart!: any[];
  userCart!: any[];
  userId = 0;
  existingCart: any;
  favorites: any[] = [];
  productInUserCart: any = [];

  constructor(
    private userData: AuthServiceService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private showMessage: MessageService
  ) {
    const productId = this.route.snapshot.paramMap.get('id');
    this.userId = Number(localStorage.getItem('user')) || 0;
    if (this.userData.logIn) {
      this.userData.getUserData(this.userId).subscribe((data) => {
        this.isFavorites =
          data.favorites?.some((p: any) => p.id == productId) || false;
        this.favorites = data.favorites || [];
        this.userCart = data.cart || [];
        this.productInUserCart =
          data.cart?.find((p: any) => p.id == productId) || [];
      });
    }
    this.dataService.getAllData().subscribe((data) => {
      this.cart = data || [];
      this.productDetails = data.find((p: any) => p.id == productId);
    });
  }
  // Handiling Rating Stars
  getFullStars(rate: number) {
    return Math.floor(rate); // For full stars
  }

  hasHalfStar(rate: number) {
    //return rate % 1 >= 0.5;  // Check for half star
    return rate % 1 > 0 && rate % 1 <= 0.9;
  }
  getEmptyStars(rate: number) {
    return 5 - Math.ceil(rate); // For empty stars
  }

  // Start Counter
  buyNow() {
    if (!this.userData.logIn) {
      this.showMessage.showError('You Have To Login');
      return;
    }
    this.userData.saveCart(this.userId, this.userCart).subscribe(
      (response) => {
        console.log(this.userCart);
        this.showMessage.showSuccess('Your Item Has Been Added to cart');
      },
      (error) => {
        console.error('Error saving favorites', error);
      }
    );
  }
  deleteFavorites() {
    const userId = JSON.parse(localStorage.getItem('user')!);
    this.favorites = this.favorites.filter(
      (item: any) => item.id !== this.productDetails.id
    );
    this.userData.deleteFavorites(userId, this.favorites).subscribe();
  }
  addToFavorites(): void {
    if (!this.isFavorites) {
      this.favorites.push({ ...this.productDetails, quantity: 1 });
      if (this.userData) {
        this.userData.saveFavorites(this.userId, this.favorites).subscribe(
          (response) => {
            this.showMessage.showSuccess(
              'Your Item Has Been Added to Favorites'
            );
          },
          (error) => {
            console.error('Error saving favorites', error);
          }
        );
      } else {
        this.showMessage.showError('You Have To Login');
      }
    } else {
      this.deleteFavorites();
      this.showMessage.showInfo('Your Item Has Been Removed From Favorites');
    }
  }
  increase(item: any) {
    const isInCart = this.userCart?.some((p: any) => p.id == item.id);
    const itemIndex = this.userCart?.findIndex((p: any) => p.id == item.id);
    this.productInUserCart = this.productDetails;
    if (!isInCart) {
      this.productInUserCart.quantity =
        (this.productInUserCart.quantity || 1) + 1;
      this.userCart.push({ ...this.productInUserCart });
    } else {
      this.userCart[itemIndex].quantity += 1;
      this.productInUserCart.quantity = this.userCart[itemIndex].quantity;
    }
  }

  decrease() {
    if (this.productInUserCart.quantity > 1) {
      this.productInUserCart.quantity =
        (this.productInUserCart.quantity || 1) - 1;
    }
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  toggleFavorite() {
    if (!this.userData.logIn) {
      this.showMessage.showError('You Have To Login');
      return;
    }
    this.addToFavorites();
    this.isFavorites = !this.isFavorites;
  }
}
