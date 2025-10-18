import { Component, effect, signal } from '@angular/core';
import { Login } from './modules/auth/login/login';
import { Router } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { CommonModule } from '@angular/common';

const COMPONENTS = [MainLayout];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Login, ...COMPONENTS],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  isloggedIn = signal(true);

  constructor(
    private router: Router,
  ) {
    effect(() => {
      if (this.isloggedIn()) {
        this.router.navigate(['/pages/main']);
      } else {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  login() {
    this.isloggedIn.set(true);
  }
}
