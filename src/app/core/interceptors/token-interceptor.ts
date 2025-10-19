import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { catchError, switchMap, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);

  const access_token = localStorage.getItem('access_token');

  const authReq = access_token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${access_token}`
    }
  }) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('login') && !req.url.includes('refresh-token')){
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          authService.setAuthStatus(null, false);
          authService.removeTokens();
          return throwError(() => error);
        }

        return authService.refreshToken(refreshToken).pipe(
          switchMap(response => {
            const newAccessToken = response.access_token;
            localStorage.setItem('access_token', newAccessToken);

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`
              }
            });

            return next(retryReq);
          }),
          catchError(err => {
            authService.setAuthStatus(null, false);
            authService.removeTokens();
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );
};

