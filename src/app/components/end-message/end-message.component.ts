import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-end-message',
  templateUrl: './end-message.component.html',
  styleUrls: ['./end-message.component.css'],
})
export class EndMessageComponent implements OnInit{
  userData: any = [];
  subtotal: number = 0;
  couponIsActive: boolean = false;
  BuyForm!: FormGroup;
  total: number = 0;

  constructor(private user: AuthServiceService) {
    this.BuyForm = this.user.BuyForm || new FormGroup({});
    const userId = Number(localStorage.getItem('user')) || 0;
  }

  ngOnInit() {
    const userId = Number(localStorage.getItem('user')) || 0;
    this.user.getUserData(userId).subscribe((data) => {
      this.userData = data;
      this.couponIsActive = this.user.couponIsActive;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.subtotal = 0;
    if (this.userData && this.userData.cart) {
      this.userData.cart.forEach((item: any) => {
        this.subtotal += item.price * item.quantity;
      });
    }

    this.total = this.subtotal;

    if (!this.couponIsActive) {
      this.total += 50;
    }
  }
}
