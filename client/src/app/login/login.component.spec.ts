import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppModule } from '../app.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, AppModule],
      declarations: [ LoginComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should log in a user successfully', () => {
    const mockResponse = { token: 'testToken' };
    const emailInput = fixture.nativeElement.querySelector('#email');
    emailInput.value = 'test@test.com';
    emailInput.dispatchEvent(new Event('input'));
    const passwordInput = fixture.nativeElement.querySelector('#password');
    passwordInput.value = 'testPassword';
    passwordInput.dispatchEvent(new Event('input'));
    const loginForm = fixture.nativeElement.querySelector('form');
    loginForm.dispatchEvent(new Event('submit'));

    const req = httpTestingController.expectOne('api.memorly.kro.kr/users/login');
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);

  });
});