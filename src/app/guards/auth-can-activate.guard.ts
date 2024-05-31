import { CanActivateFn } from '@angular/router';

export const authCanActivateGuard: CanActivateFn = (route, state) => {
  return true;
};
