import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  const isAuthenticated = authService.authStatus();

  if (isAuthenticated) {
    router.navigate(['/pages/main']);
  }

  return true;
};
