import { CanActivateFn } from '@angular/router';

export const authCanDeactivateGuard: CanActivateFn = (route, state) => {
  return true;
};
