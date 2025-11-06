import { Component, inject } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Theme } from '../../../core/services/global/theme';
import { UserLoginResponseInterface } from '../../../core/interfaces/user.interface';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Modal } from '../../../core/services/global/modal';

@Component({
  selector: 'app-sidebar-right',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-right.html',
  styleUrl: './sidebar-right.scss'
})
export class SidebarRight {

  theme: 'light' | 'dark' = 'light';
  user: UserLoginResponseInterface | null = null;

  private themeService = inject(Theme);
  private authService = inject(Auth);
  private router = inject(Router);
  private modalService = inject(Modal);

  constructor() {
    this.themeService.theme$.subscribe((theme: 'light' | 'dark') => {
      this.theme = theme;
    })
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  onLogout() {
    this.modalService.openModal(
      {
        title: 'Cerrar sesión',
        type: 'warning',
        icon: 'pi pi-sign-out',
        message: '¿Estás seguro de que quieres cerrar sesión?',
        confirmText: 'Cerrar sesión',
        cancelText: 'Cancelar',
      },
      () => {
        this.logout();
      },
      () => {}
    );
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      }, error: () => {
      }
    })
  }

}
