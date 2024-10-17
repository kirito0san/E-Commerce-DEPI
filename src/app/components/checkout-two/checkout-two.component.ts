import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-checkout-two',
  templateUrl: './checkout-two.component.html',
  styleUrls: ['./checkout-two.component.css'],
})
export class CheckoutTwoComponent {
  userData: any = [];
  subtotal: number = 0;
  couponIsActive: boolean = false;
  BuyForm!: FormGroup;
  constructor(
    private user: AuthServiceService,
    public showMessage: ToastrService
  ) {
    const userId = Number(localStorage.getItem('user')) || 0;
    this.userData = this.user.getUserData(userId).subscribe((data) => {
      this.userData = data;
      this.userData.cart.map((e: any) => {
        this.subtotal += e.price * e.quantity;
      });
      this.couponIsActive = this.user.couponIsActive;
    });
    this.BuyForm = this.user.BuyForm;
  }
  onSubmit() {
    if (this.BuyForm.valid) {
      this.user.isBuy = true;
    } else {
      this.showMessage.error('form is Invalid', 'Error');
    }
  }
}
