import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../service/token.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  
  const tokenService = inject(TokenService);
  const token = tokenService.getAccessToken();

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }
  
  return next(req);
};