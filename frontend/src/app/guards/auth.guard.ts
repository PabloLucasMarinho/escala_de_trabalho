import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, RedirectCommand, Router } from '@angular/router';

export const authGuard: CanMatchFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('authToken');

  if (token) {
    return true;
  } else {
    return new RedirectCommand(router.parseUrl('/login'));
  }
};
