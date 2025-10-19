import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/dev.env';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthResponseInterface, CredentialsInterface, UserSessionInterface } from '../interfaces/auth.interface';
import { UserLoginResponseInterface } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private API_BACK: string = environment.apiAuth;
  public _currentUser = signal<UserLoginResponseInterface | null>(null);
  private _authStatus = signal<boolean>(false);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  public setAuthStatus(user: UserLoginResponseInterface | null, status: boolean): void {
    this._authStatus.set(status);
    this._currentUser.set(user);
  }

  login(credencials: CredentialsInterface): Observable<boolean> {
    return this.http.post<AuthResponseInterface>(`${this.API_BACK}/v1/login`, credencials)
      .pipe(
        tap((response) => {
          if (response.access_token && response.refresh_token && response.user) {
            this.setTokens(response.access_token, response.refresh_token);
            this.setAuthStatus(response.user, true);
          } else {
            throw new Error('Respuesta inválida del servidor');
          }
        }),
        map(() => true),
        catchError(err => {
          this.setAuthStatus(null, false);
          return throwError(() => err);
        })
      );
  }

  checkAuthStatus(): Observable<boolean> {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      this.setAuthStatus(null, false);
      return of(false);
    }

    return this.checkSession().pipe(
      map((session) => {
        this.setAuthStatus(session.user, true);
        return true;
      }),
      catchError(() => {
        this.setAuthStatus(null, false);
        this.removeTokens();
        return of(false);
      })
    );
  }

  checkSession(): Observable<UserSessionInterface> {
    return this.http.get<UserSessionInterface>(`${this.API_BACK}/v1/check-session`);
  }

  setTokens(access_token: string, refresh_token: string): void {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  }

  removeTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  refreshToken(refresh_token: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.API_BACK}/v1/refresh-token`, { refresh_token: refresh_token });
  }

  initializeSession(): Observable<boolean> {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    if (!access_token || !refresh_token) {
      this.setAuthStatus(null, false);
      return of(false);
    }

    return this.checkAuthStatus();
  }

  logout(): Observable<any> {
    this.setAuthStatus(null, false);
    return this.http.post(`${this.API_BACK}/v1/logout`, {}).pipe(
      tap(() => {
        this.removeTokens();
        this.router.navigate(['/auth/login']);
      }),
      catchError((err) => {
        this.router.navigate(['/auth/login']);
        return of(null);
      })
    );
  }
}
