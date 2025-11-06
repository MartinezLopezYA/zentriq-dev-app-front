import { Component, inject } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Theme } from '../../../core/services/global/theme';
import { ThemeComponet } from '../../../shared/components/theme-component/theme-component';
import { Alerts } from '../../../core/services/global/alerts';
import { Router } from '@angular/router';
import { User } from '../../../core/services/user';
import { map, of, switchMap, tap } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

const COMPONENTS = [ThemeComponet];
const COMPONENTS_PRIMENG = [ButtonModule, InputTextModule];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ...COMPONENTS, ...COMPONENTS_PRIMENG],
  templateUrl: './login.html',
})
export class Login {

  showPassword: boolean = false;
  theme: 'light' | 'dark' = 'light';
  loading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    useremail: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    userpassword: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)])
  });

  private authService = inject(Auth);
  private userService = inject(User);
  private themeService = inject(Theme);
  private alertService = inject(Alerts);
  private router = inject(Router);

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme: 'light' | 'dark') => {
      this.theme = theme;
    })
  }

  login() {
    if (this.loginForm.invalid) {
      this.alertService.showAlert('Por favor completa todos los campos correctamente.', 'error');
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
          this.alertService.showAlert('Inicio de sesión exitoso.', 'success');
          this.router.navigate(['/pages/users']);
        } else {
          this.alertService.showAlert('Error al iniciar sesión.', 'error');
        }
      },
      error: (err) => {
        this.loading = false;
        if (err.error?.errorCode === 'USER_CREDENTIALS_NOT_VALID_ERROR') {
          this.alertService.showAlert('Credenciales incorrectas.', 'error');
        } else {
          this.alertService.showAlert('Error inesperado. Intenta nuevamente.', 'error');
        }
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
