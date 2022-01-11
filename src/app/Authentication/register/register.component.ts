import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeResponse } from 'src/app/home/home-response';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorRes:String = '';
  successRes:String = '';

  userRequest = {
    firstName :String,
    lastName:String,
    email:String,
    password:String,
    confirmPassword:String
  }

  constructor(private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }


  onSubmit(form:NgForm){
    this.userRequest.firstName = form.value.firstName;
    this.userRequest.lastName = form.value.lastName;
    this.userRequest.email = form.value.email;
    this.userRequest.password = form.value.password;
    this.userRequest.confirmPassword = form.value.confPassword;
    
    this.authService.register(this.userRequest)
    .subscribe((data:HomeResponse) => {
      this.successRes = data.message;
      setTimeout(() =>{ this.router.navigate(['']); }, 3000);
      
    },
    (errorMessage: any) => {
      this.errorRes = errorMessage;
    });
    form.reset();
  }
}
