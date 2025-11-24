import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { catchError, map, of } from 'rxjs';

export const noAuthGuard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  return authService.initializeSession().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigate(['/pages/main']);
        return false;
      }
      return true;
    }),
    catchError(() => of(true))
  );
};
