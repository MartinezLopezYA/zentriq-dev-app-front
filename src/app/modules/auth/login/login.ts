import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Theme } from '../../../core/services/global/theme';
import { ThemeComponet } from '../../../shared/components/theme-component/theme-component';
import { Alerts } from '../../../core/services/global/alerts';
import { Router } from '@angular/router';
import { User } from '../../../core/services/user';
import { map, of, switchMap, tap } from 'rxjs';

const COMPONENTS = [ThemeComponet];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ...COMPONENTS],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {

  showPassword: boolean = false;
  theme: 'light' | 'dark' = 'light';
  loading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    useremail: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    userpassword: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private authService: Auth,
    private userService: User,
    private themeService: Theme,
    private alertsService: Alerts,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme: 'light' | 'dark') => {
      this.theme = theme;
    })
  }

  login() {
    if (this.loginForm.invalid) {
      this.alertsService.showAlert('Por favor completa todos los campos correctamente.', 'error');
      return;
    }

    this.loading = true;

    const credentials = {
      useremail: this.loginForm.get('useremail')?.value,
      userpassword: this.loginForm.get('userpassword')?.value
    };

    this.authService.login(credentials).pipe(
      switchMap((success) => {
        if (success) {
          const useruuid = this.authService.currentUser()?.useruuid;
          if (useruuid) {
            return this.userService.getProfile().pipe(
              tap((profileRes) => {
              }),
              map(() => true)
            );
          }
        }
        return of(false);
      })
    ).subscribe({
      next: (success) => {
        this.loading = false;
        if (success) {
          this.alertsService.showAlert('Inicio de sesión exitoso.', 'success');
          this.router.navigate(['/pages/main']);
        } else {
          this.alertsService.showAlert('Error al iniciar sesión.', 'error');
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Error en login:', err);

        if (err.error?.errorCode === 'USER_CREDENTIALS_NOT_VALID_ERROR') {
          this.alertsService.showAlert('Credenciales incorrectas.', 'error');
        } else {
          this.alertsService.showAlert('Error inesperado. Intenta nuevamente.', 'error');
        }
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
