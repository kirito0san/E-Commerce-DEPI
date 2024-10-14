import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-end-message',
  templateUrl: './end-message.component.html',
  styleUrls: ['./end-message.component.css'],
})
export class EndMessageComponent {
  userData: any = [];
  subtotal: number = 0;
  couponIsActive: boolean = false;
  BuyForm!: FormGroup;

  constructor(private user: AuthServiceService) {
    this.BuyForm = this.user.BuyForm;
    console.log(this.BuyForm.controls);

    const userId = Number(localStorage.getItem('user')) || 0;
    this.userData = this.user.getUserData(userId).subscribe((data) => {
      this.userData = data;
      this.userData.cart.map((e: any) => {
        this.subtotal += e.price * e.quantity;
      });
      this.couponIsActive = this.user.couponIsActive;
    });
  }
}
