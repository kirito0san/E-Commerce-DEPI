import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ProductComponent } from './product.component';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'src/app/service/message.service';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let authServiceMock: jasmine.SpyObj<AuthServiceService>;
  let dataServiceMock: jasmine.SpyObj<DataService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;
  let activatedRouteMock: Partial<ActivatedRoute>;
  let paramMapMock: jasmine.SpyObj<ParamMap>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthServiceService', [
      'getUserData',
      'saveCart',
      'saveFavorites',
      'deleteFavorites',
    ]);
    dataServiceMock = jasmine.createSpyObj('DataService', ['getAllData']);
    messageServiceMock = jasmine.createSpyObj('MessageService', [
      'showSuccess',
      'showError',
      'showInfo',
    ]);

    paramMapMock = jasmine.createSpyObj<ParamMap>('ParamMap', [
      'get',
      'has',
      'getAll',
      'keys',
    ]);
    paramMapMock.get.and.returnValue('1');
    const activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: (key: string) => '1', // Return a mocked route parameter, e.g., '1'
        },
      },
      paramMap: of({
        get: (key: string) => '1', // Observable mock of paramMap for route changes
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        { provide: AuthServiceService, useValue: authServiceMock },
        { provide: DataService, useValue: dataServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    authServiceMock.getUserData.and.returnValue(
      of({ favorites: [], cart: [] })
    );
    dataServiceMock.getAllData.and.returnValue(
      of([
        {
          id: 1,
          title: 'Test Product',
          description: 'Test Description',
          price: 10,
          image: 'test.jpg',
          rating: { rate: 4.5, count: 100 },
        },
      ])
    );

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate stars correctly', () => {
    expect(component.getFullStars(3.7)).toBe(3);
    expect(component.hasHalfStar(3.7)).toBe(true);
    expect(component.getEmptyStars(3.7)).toBe(1);
  });

  it('should add to favorites when logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue('1');
    authServiceMock.logIn = true;
    authServiceMock.saveFavorites.and.returnValue(of({}));
    component.addToFavorites();
    expect(authServiceMock.saveFavorites).toHaveBeenCalled();
    expect(messageServiceMock.showSuccess).toHaveBeenCalledWith(
      'Your Item Has Been Added to Favorites'
    );
  });

  it('should increase quantity', () => {
    const testItem = { id: 1, quantity: 1 };
    component.userCart = [];
    component.increase(testItem);
    expect(component.userCart.length).toBe(1);
    expect(component.userCart[0].quantity).toBe(2);
  });

  it('should decrease quantity', () => {
    component.productInUserCart = { quantity: 2 };
    component.decrease();
    expect(component.productInUserCart.quantity).toBe(1);
  });
  it('should not decrease quantity below 1', () => {
    component.productInUserCart = { quantity: 1 };
    component.decrease();
    expect(component.productInUserCart.quantity).toBe(1);
  });
  it('should select size', () => {
    component.selectSize('M');
    expect(component.selectedSize).toBe('M');
  });
  it('should toggle favorite when logged in', () => {
    spyOn(component, 'addToFavorites');
    authServiceMock.logIn = true;
    component.toggleFavorite();
    expect(component.addToFavorites).toHaveBeenCalled();
    expect(component.isFavorites).toBe(true);
  });
});
