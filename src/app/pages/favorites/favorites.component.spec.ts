import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';

import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MessageService } from 'src/app/service/message.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  let authServiceMock: jasmine.SpyObj<AuthServiceService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create mock services
    authServiceMock = jasmine.createSpyObj('AuthServiceService', ['getUserData', 'saveCart', 'deleteFavorites']);
    messageServiceMock = jasmine.createSpyObj('MessageService', ['showSuccess', 'showInfo']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    // Mock the getUserData to return user data with a valid userId
    authServiceMock.getUserData.and.returnValue(of({ userId: 'mockUserId', favorites: [] }));
    authServiceMock.saveCart.and.returnValue(of({})); // Mock the saveCart to return an observable
    authServiceMock.deleteFavorites.and.returnValue(of({}));  // Mock deleteFavorites

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        FavoritesComponent
      ],
      // declarations: [FavoritesComponent],
      providers: [
        { provide: AuthServiceService, useValue: authServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user') {
        return JSON.stringify('mockUserId'); // Mocked userId
      }
      return null;
    });
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch favorites and cart on initialization', () => {
    const mockUserData = {
      favorites: [{ id: 1, name: 'Product 1' }],
      cart: [],
    };
    authServiceMock.getUserData.and.returnValue(of(mockUserData));

    component.ngOnInit(); // Ensure ngOnInit is called to fetch data

    expect(authServiceMock.getUserData).toHaveBeenCalled();
    expect(component.favorites).toEqual(mockUserData.favorites);
    expect(component.cart).toEqual(mockUserData.cart);
  });

  it('should add item to cart', () => {
    const itemToAdd = { id: 1, name: 'Product 1' };
    component.cart = [];

    component.AddToCart(itemToAdd);

    expect(component.cart.length).toBe(1);
    expect(component.cart[0].id).toBe(itemToAdd.id);
    expect(messageServiceMock.showSuccess).toHaveBeenCalledWith('Item Added To Cart');
    expect(authServiceMock.saveCart).toHaveBeenCalled();  // Ensure saveCart is called
  });

  it('should not add item to cart if it already exists', () => {
    const existingItem = { id: 1, name: 'Product 1', quantity: 1 };
    component.cart = [existingItem];

    component.AddToCart(existingItem);

    expect(component.cart.length).toBe(1); // Quantity should not increase
    expect(messageServiceMock.showInfo).toHaveBeenCalledWith('Item Already In Cart');
  });

  it('should delete item from favorites', () => {
    const favoriteToDelete = { id: 1, name: 'Product 1' };
    component.favorites = [favoriteToDelete];

    authServiceMock.deleteFavorites.and.returnValue(of(null));

    component.deleteFavorites(favoriteToDelete.id);

    expect(component.favorites.length).toBe(0);
    expect(authServiceMock.deleteFavorites).toHaveBeenCalledWith('mockUserId', []);
  });

  it('should navigate to product details', () => {
    const productId = 1;

    component.goToProductDetails(productId);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/product', productId]);
  });
});
