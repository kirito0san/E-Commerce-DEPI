import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MessageService } from 'src/app/service/message.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authServiceMock: jasmine.SpyObj<AuthServiceService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;
  let router: Router;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthServiceService', ['getAllUser', 'register']);
    messageServiceMock = jasmine.createSpyObj('MessageService', ['showSuccess', 'showError']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        SignupComponent,
        RouterTestingModule.withRoutes([
          { path: 'login', component: {} as any },
          { path: 'signup', component: SignupComponent }
        ])
      ],
      providers: [
        { provide: AuthServiceService, useValue: authServiceMock },
        { provide: MessageService, useValue: messageServiceMock }
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authServiceMock.getAllUser.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.signupForm).toBeDefined();
    expect(component.signupForm.contains('name')).toBeTruthy();
    expect(component.signupForm.contains('email')).toBeTruthy();
    expect(component.signupForm.contains('password')).toBeTruthy();
    expect(component.signupForm.contains('number')).toBeTruthy();
  });

  it('should make the name control required', () => {
    const control = component.signupForm.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the email control required and check for valid email', () => {
    const control = component.signupForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
    control?.setValue('test');
    expect(control?.valid).toBeFalsy();
    control?.setValue('test@example.com');
    expect(control?.valid).toBeTruthy();
  });

  it('should make the password control required and check for minimum length', () => {
    const control = component.signupForm.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
    control?.setValue('12345');
    expect(control?.valid).toBeFalsy();
    control?.setValue('123456');
    expect(control?.valid).toBeTruthy();
  });

  it('should make the number control required, numeric, and max 11 characters', () => {
    const control = component.signupForm.get('number');
    expect(control).toBeTruthy();
    if (control) {
      control.setValue('');
      expect(control.valid).toBeFalsy();
      expect(control.errors?.['required']).toBeTruthy();

      control.setValue('abc');
      expect(control.valid).toBeFalsy();
      expect(control.errors?.['pattern']).toBeTruthy();

      control.setValue('123456789012');
      expect(control.valid).toBeFalsy();
      expect(control.errors?.['maxlength']).toBeTruthy();

      control.setValue('12345678901');
      expect(control.valid).toBeTruthy();
      expect(control.errors).toBeNull();
    }
  });

  it('should call register method on valid form submission', () => {
    authServiceMock.register.and.returnValue(of({}));
    component.signupForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
      number: '1234567890'
    });
    component.onSubmit();
    expect(authServiceMock.register).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
      phoneNumber: '1234567890'
    });
    expect(messageServiceMock.showSuccess).toHaveBeenCalledWith('Registration successful');
  });

  it('should show error message if email already exists', () => {
    authServiceMock.getAllUser.and.returnValue(of([{ email: 'test@example.com' }]));
    component.ngOnInit();
    component.signupForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
      number: '1234567890'
    });
    component.onSubmit();
    expect(authServiceMock.register).not.toHaveBeenCalled();
    expect(messageServiceMock.showError).toHaveBeenCalledWith('Registration failed ,Email already exists');
  });

  it('should show error message if registration fails', () => {
    authServiceMock.register.and.returnValue(throwError(() => new Error('Error')));
    component.signupForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
      number: '1234567890'
    });
    component.onSubmit();
    expect(messageServiceMock.showError).toHaveBeenCalledWith('Registration failed');
  });

});
