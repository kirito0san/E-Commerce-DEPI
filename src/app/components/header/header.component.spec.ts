import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { DataService } from 'src/app/service/data.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsComponent } from 'src/app/pages/products/products.component';

class MockDataService {
  searchResult = '';
}

class MockAuthService {
  logIn = false;

  logout() {
    this.logIn = false;
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let mockAuthService: MockAuthService;
  let mockDataService: MockDataService;
  let router: Router;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'products', component: ProductsComponent },
          { path: 'login', component: {} as any },
          { path: '', redirectTo: '/products', pathMatch: 'full' }
        ]),
        FormsModule,
        HeaderComponent
      ],
      providers: [
        { provide: AuthServiceService, useClass: MockAuthService },
        { provide: DataService, useClass: MockDataService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthServiceService) as unknown as MockAuthService;
    mockDataService = TestBed.inject(DataService) as MockDataService;
    router = TestBed.inject(Router);
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle search input visibility and focus input if visible', () => {
    // Initially, search input should be hidden
    expect(component.showInput).toBeFalse();

    // Trigger toggleSearch
    component.toggleSearch();
    fixture.detectChanges(); // Trigger change detection

    // Now search input should be visible
    expect(component.showInput).toBeTrue();

    // Simulate input element focusing
    spyOn(component.searchInput.nativeElement, 'focus');

    component.toggleSearch();
    fixture.detectChanges(); // Trigger change detection

    // After second toggle, it should be hidden again
    expect(component.showInput).toBeFalse();
  });

  it('should hide search input when clicking outside', () => {
    component.showInput = true; // Assume the input is visible
    const event = new MouseEvent('click');

    // Mock the searchContainer to not contain the event target
    spyOn(component.searchContainer.nativeElement, 'contains').and.returnValue(false);

    component.onClickOutside(event);
    fixture.detectChanges();

    // Now the input should be hidden
    expect(component.showInput).toBeFalse();
  });

  it('should toggle dropdown visibility', () => {
    // Initially, the dropdown should be hidden
    expect(component.isDropdownVisible).toBeFalse();

    // Toggle dropdown
    component.dropDown();
    fixture.detectChanges();

    // Now dropdown should be visible
    expect(component.isDropdownVisible).toBeTrue();

    // Toggle dropdown again
    component.dropDown();
    fixture.detectChanges();

    // Now dropdown should be hidden again
    expect(component.isDropdownVisible).toBeFalse();
  });

  it('should hide the dropdown', () => {
    component.isDropdownVisible = true; // Assume the dropdown is visible

    component.hideDropdown();
    fixture.detectChanges();

    // Now the dropdown should be hidden
    expect(component.isDropdownVisible).toBeFalse();
  });

  it('should toggle dropdown visibility', () => {
    expect(component.isDropdownVisible).toBeFalse();
    component.dropDown();
    expect(component.isDropdownVisible).toBeTrue();
  });

  it('should hide dropdown on hideDropdown call', () => {
    component.dropDown();
    expect(component.isDropdownVisible).toBeTrue();
    component.hideDropdown();
    expect(component.isDropdownVisible).toBeFalse();
  });

  // it('should adjust for desktop on window resize and hide dropdown', () => {
  //   const event = new Event('resize');
  //   const spy = spyOnProperty(window, 'innerWidth', 'get');

  //   spy.and.returnValue(600);
  //   component.onResize(event);
  //   fixture.detectChanges();

  //   expect(component.isDesktop).toBeFalse();

  //   spy.and.returnValue(1024);
  //   component.onResize(event);
  //   fixture.detectChanges();

  //   expect(component.isDesktop).toBeTrue();
  //   expect(component.isDropdownVisible).toBeFalse();
  // });

  it('should log out and navigate to login page', () => {
    spyOn(component.userAuth, 'logout').and.callThrough(); // Spy on the logout method
    spyOn(router, 'navigate'); // Spy on the router navigate method

    component.logOut();
    fixture.detectChanges();

    // Expect logout to be called
    expect(component.userAuth.logout).toHaveBeenCalled();

    // Expect route to navigate to '/login'
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set focus on the search input when toggled', (done) => {
    spyOn(component, 'toggleSearch').and.callThrough();
    component.toggleSearch();

    setTimeout(() => {
      expect(component.showInput).toBeTrue();
      done();
    }, 100);
  });

  it('should search and navigate to products page when search term is not empty', fakeAsync(() => {
    component.searchTerm = 'test search';
    component.showInput = true;
    spyOn(router, 'navigate');
    component.toggleSearch();
    tick();

    expect(mockDataService.searchResult).toBe('test search');
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  }));

  it('should reset search term after searching', fakeAsync(() => {
    component.searchTerm = 'test search';
    component.showInput = true;
    spyOn(router, 'navigate');
    component.toggleSearch();
    tick();

    expect(component.searchTerm).toBe('');
  }));

  it('should handle login status change from AuthService', () => {
    expect(component.logIn).toBeFalse();
    mockAuthService.logIn = true;
    component.ngDoCheck();
    expect(component.logIn).toBeTrue();
  });

  it('should have initial values set correctly', () => {
    expect(component.showInput).toBeFalse();
    expect(component.isDropdownVisible).toBeFalse();
    expect(component.logIn).toBeFalse();
});

it('should clear search term after navigation', fakeAsync(() => {
  component.searchTerm = 'test';
  component.showInput = true;
  spyOn(router, 'navigate');
  component.toggleSearch();
  tick();

  expect(component.searchTerm).toBe('');
  expect(router.navigate).toHaveBeenCalledWith(['/products']);
}));

});
