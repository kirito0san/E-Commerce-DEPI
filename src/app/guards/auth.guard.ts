import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toster = inject(ToastrService);
  const user = localStorage.getItem('user');
  if (user) {
    return true;
  } else {
    toster.error('You Have To Login', 'Error');
    return false;
  }
};
