import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutOneComponent } from './checkout-one.component';

describe('CheckoutOneComponent', () => {
  let component: CheckoutOneComponent;
  let fixture: ComponentFixture<CheckoutOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutOneComponent]
    });
    fixture = TestBed.createComponent(CheckoutOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
