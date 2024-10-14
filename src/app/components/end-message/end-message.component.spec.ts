import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndMessageComponent } from './end-message.component';

describe('EndMessageComponent', () => {
  let component: EndMessageComponent;
  let fixture: ComponentFixture<EndMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndMessageComponent]
    });
    fixture = TestBed.createComponent(EndMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
