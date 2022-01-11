import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../Authentication/auth.service';
import { HomeResponse } from './home-response';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private authService: AuthService,
    private httpClinet: HttpClient
  ) {}

  publishMessage(message: any) {
    //let url = `http://localhost:8000/user/publish`;

    /*  let token = localStorage.getItem('token');

    return this.httpClinet.post<HomeResponse>(url, message, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
      }),
    }); */
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        console.log('Token is' + user.token);
        let url = `http://localhost:8000/user/publish`;
         return this.httpClinet.post<HomeResponse>(url, message, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+user.token
          }),
        });
      })
    );
  }
}
