/* import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    this.authService.user.pipe(
        take(1),
        exhaustMap(user => {

            let modiReq = req.clone({
                params : new HttpParams().set('Authorization', 'Bearer' + user.token)
            })
            return next.handle(modiReq)
        })
    );

    return next.handle(req)
  
  }
}
 */