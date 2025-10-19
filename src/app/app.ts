import { Component, effect } from '@angular/core';
import { Login } from './modules/auth/login/login';
import { MainLayout } from './layouts/main-layout/main-layout';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './shared/components/alerts/alerts';
import { Auth } from './core/services/auth';
import { Router } from '@angular/router';
import { SpinnerComponent } from './shared/components/spinner/spinner';

const COMPONENTS = [AlertsComponent, MainLayout, SpinnerComponent];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Login, ...COMPONENTS],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  authStatus;
  loading: boolean = true;

  constructor(
    public authService: Auth,
    private router: Router
  ) {
    this.authStatus = this.authService.authStatus;
  }

  ngOnInit() {
    this.authService.initializeSession().subscribe({
      next: (isAuthenticated) => {
        this.loading = false;
        if (!isAuthenticated) {
          this.router.navigate(['/auth/login']);
        } else {
          this.router.navigate(['/pages/main']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
