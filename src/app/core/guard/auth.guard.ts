import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../service/token.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {

    const tokenService = inject(TokenService);
    const router = inject(Router);

    if (tokenService.isLoggedIn()) {
      return true; //Insert also role based authentication here isAdminOrUser()
    } else {
      router.navigate(['login']);
      return false;
    }

};