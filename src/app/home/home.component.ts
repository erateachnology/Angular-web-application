import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HomeResponse } from './home-response';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message = {
    message: String,
  };
  isPublished = false;
  isSuccess = '';
  constructor(private homeServicve: HomeService, private router: Router) {}

  ngOnInit(): void {}

  onPublish(form: NgForm) {
    this.message.message = form.value.message;
    console.log('Published message ' + this.message);
    this.homeServicve
      .publishMessage(this.message)
      .subscribe((resData: HomeResponse) => {
        console.log(resData);
        this.isPublished = true;
        this.isSuccess = resData.message;
      });

      form.reset();
  }

  logOut() {
    console.log('Log out cleared');
    localStorage.removeItem('token');
    console.log('Cleared item' + localStorage.getItem('token'));
    this.router.navigate(['']);
  }
}
