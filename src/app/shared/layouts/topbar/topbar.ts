import { Component, inject } from '@angular/core';
import { Theme } from '../../../core/services/global/theme';
import { UserLoginResponseInterface } from '../../../core/interfaces/user.interface';
import { User } from '../../../core/services/user';
import { Alerts } from '../../../core/services/global/alerts';
import { Modal } from '../../../core/services/components/modal';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../../core/services/components/sidebar';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule],
  template: `
    <div class="w-full h-(--topbar-height) p-section transition-all duration-300 ease-in-out">
      <div class="w-full h-full flex items-center bg-(--card) rounded-lg px-8" [ngClass]="!isOpenMenu ? 'justify-between' : 'justify-end'" >
        @if(theme === 'light') {
          <img [ngClass]="!isOpenMenu ? 'flex' : 'hidden'"  src="/images/Logo Completo Light.png" alt="">
        }@else {
          <img [ngClass]="!isOpenMenu ? 'flex' : 'hidden'"  src="/images/Logo Completo Dark.png" alt="">
        }
        <div class="flex items-center gap-3">
          <div class="flex flex-col justify-center items-end">
            <span class="text-roboto font-bold text-sm text-(--neutral-text)">{{ user?.firstname }} {{ user?.lastname}}</span>
            <span class="text-poppins text-xs text-(--neutral-text)">{{ roles.join(', ') }}</span>
          </div>
          <img class="w-8 h-8 rounded-full object-cover" src="https://i.pravatar.cc/300" alt="User Avatar">
          <button type="button" class="flex justify-center items-center text-(--primary) text-lg hover:bg-(--slate-200) transition duration-300 ease-in-out p-10 rounded" (click)="toggleTheme()">
            @if(theme === 'dark') {
              <i class="pi pi-sun text-sm"></i>
            }@else {
              <i class="pi pi-moon text-sm"></i>
            }
          </button>
          <button type="button" class="flex justify-center items-center text-(--primary) text-lg hover:bg-(--slate-200) transition duration-300 ease-in-out p-10 rounded" (click)="onLogout()">
            <i class="pi pi-power-off text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      grid-area: topbar;
    }
  `
})
export class Topbar {

  theme: 'light' | 'dark' = 'light';
  isOpenMenu: boolean = false;
  user: UserLoginResponseInterface | null = null;
  roles: string[] = [];

  private themeService = inject(Theme);
  private userService = inject(User);
  private alertService = inject(Alerts);
  private modalService = inject(Modal);
  private authService = inject(Auth);
  private router = inject(Router);
  private sidebarService = inject(Sidebar);


  constructor() {
    this.themeService.theme$.subscribe((theme: 'light' | 'dark') => {
      this.theme = theme;
    });
    this.sidebarService.sidebarVisible$.subscribe((isVisible) => {
      this.isOpenMenu = isVisible;
    });

    if (window.innerWidth <= 768) {
      this.sidebarService.closeSidebar();
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme: 'light' | 'dark') => {
      this.theme = theme;
    });
    this.loadUser();
  }

  loadUser() {
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.userService._currentUser.set(res);
        this.user = this.userService.currentUser();
        this.roles = this.userService.currentUser()?.additionalInfo?.roles.map((role) => role.rolename) || [];
      },
      error: () => {
        this.alertService.showAlert('Error al cargar el usuario.', 'error');
      }
    }
    )
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
      () => { }
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
