import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MessageService } from 'src/app/service/message.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let authServiceMock: jasmine.SpyObj<AuthServiceService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthServiceService', [
      'getUserData',
      'deleteCart',
      'saveCart',
    ]);
    messageServiceMock = jasmine.createSpyObj('MessageService', [
      'showSuccess',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CartComponent,
        RouterTestingModule,
        MatButtonModule,
        MatCardModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: AuthServiceService, useValue: authServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
      ],
    }).compileComponents();

    spyOn(localStorage, 'getItem').and.returnValue('1');
    authServiceMock.getUserData.and.returnValue(
      of({ cart: [{ id: 1, price: 10, quantity: 2 }] })
    );

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cart and calculate total', () => {
    expect(component.userCart).toEqual([{ id: 1, price: 10, quantity: 2 }]);
    expect(component.totalCartCost).toBe(20);
  });

  it('should activate valid coupon', () => {
    component.activeCoupon({ value: 'ahmed' });
    expect(component.couponIsActive).toBeTrue();
    expect(messageServiceMock.showSuccess).toHaveBeenCalledWith(
      'Shipping On Us 😉'
    );
  });

  it('should not activate invalid coupon', () => {
    component.activeCoupon({ value: 'invalid' });
    expect(component.couponIsActive).toBeFalse();
    expect(messageServiceMock.showSuccess).not.toHaveBeenCalled();
  });

  it('should delete item from cart', () => {
    authServiceMock.deleteCart.and.returnValue(of({}));
    component.deleteCart(1);
    expect(component.userCart.length).toBe(0);
    expect(authServiceMock.deleteCart).toHaveBeenCalled();
  });

  it('should update quantity and save cart', () => {
    authServiceMock.saveCart.and.returnValue(of({}));
    component.quantity({ value: 2 }, { id: 1, price: 10, quantity: 2 });
    expect(component.userCart[0].quantity).toBe(2);
    expect(component.totalCartCost).toBe(20);
    expect(authServiceMock.saveCart).toHaveBeenCalled();
  });

  it('should delete item when quantity is less than 1', () => {
    spyOn(component, 'deleteCart');
    component.quantity({ value: 0 }, { id: 1, price: 10, quantity: 2 });
    expect(component.deleteCart).toHaveBeenCalledWith(1);
  });
});
