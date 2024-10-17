import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MessageService } from 'src/app/service/message.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: jasmine.SpyObj<AuthServiceService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthServiceService', [
      'login',
      'logInUser',
    ]);
    messageServiceMock = jasmine.createSpyObj('MessageService', [
      'showSuccess',
      'showError',
    ]);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: AuthServiceService, useValue: authServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.signupForm).toBeDefined();
    expect(component.signupForm.get('email')).toBeDefined();
    expect(component.signupForm.get('password')).toBeDefined();
  });

  it('should call authService.login on form submission', () => {
    authServiceMock.login.and.returnValue(of([]));
    component.signupForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });
    component.onSubmit();
    expect(authServiceMock.login).toHaveBeenCalled();
  });

  it('should show success message and navigate on successful login', () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'password123',
    };
    authServiceMock.login.and.returnValue(of([mockUser]));
    component.signupForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });
    component.onSubmit();
    expect(messageServiceMock.showSuccess).toHaveBeenCalledWith('Welcome Back');
    // You might want to add a test for navigation here
  });

  it("should show error message when user doesn't exist", () => {
    authServiceMock.login.and.returnValue(of([]));
    component.signupForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });
    component.onSubmit();
    expect(messageServiceMock.showError).toHaveBeenCalledWith(
      'User Doesn`t Exist'
    );
  });

  it('should show error message on server error', () => {
    authServiceMock.login.and.returnValue(
      throwError(() => new Error('Server error'))
    );
    component.signupForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });
    component.onSubmit();
    expect(messageServiceMock.showError).toHaveBeenCalledWith('server down');
  });
});
