import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1), // unsubscribe after 1 fetch
      exhaustMap((user) => {
        if (!user) {
          // user = new User('', '', '', new Date());
          return next.handle(req)
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token || ''),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
