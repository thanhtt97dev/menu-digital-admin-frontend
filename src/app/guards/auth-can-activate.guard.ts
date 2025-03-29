import { USER } from '@/commons/constants/models/user.model.constant';
import {
  getAccessToken,
  getRoleId,
  getUserId,
} from '@/commons/utils/cookie.util';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardForAdmin implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userId = getUserId();
    const roleId = getRoleId();
    const accessToken = getAccessToken();
    if (!userId || !roleId || !accessToken) {
      this.router.navigate(['/sign-in']); // Redirect to sign-in page
      return false;
    }

    if (roleId != USER.ROLE.ADMIN.toString()) {
      this.router.navigate(['/sign-in']); // Redirect to sign-in page
      return false;
    }
    return true;
  }
}
