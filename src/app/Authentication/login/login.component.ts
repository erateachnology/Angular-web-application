import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../Login-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginRequest = {
    email: String,
    password: String,
  };

  isLoading: boolean = false;
  isSuccess: string = '';
  errorRes: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.loginRequest.email = form.value.email;
    this.loginRequest.password = form.value.password;
    this.isLoading = true;
    this.authService.login(this.loginRequest).subscribe(
      (res: LoginResponse) => {
        this.isLoading = false;
        this.isSuccess = res.message;
        console.log("Login success");
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      },
      (errorMessage: any) => {
        this.isLoading = false;
        this.errorRes = errorMessage;
      }
    );
    form.reset();
  }
}
