import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HugInaBoxComponent } from './hug-ina-box.component';

describe('HugInaBoxComponent', () => {
  let component: HugInaBoxComponent;
  let fixture: ComponentFixture<HugInaBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HugInaBoxComponent]
    });
    fixture = TestBed.createComponent(HugInaBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
