import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutTwoComponent } from './checkout-two.component';

describe('CheckoutTwoComponent', () => {
  let component: CheckoutTwoComponent;
  let fixture: ComponentFixture<CheckoutTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutTwoComponent]
    });
    fixture = TestBed.createComponent(CheckoutTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
