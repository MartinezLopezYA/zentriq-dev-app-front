import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Sidebar } from '../../../core/services/components/sidebar';
import { Theme } from '../../../core/services/global/theme';

@Component({
  selector: 'app-sidebar-left',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-left.html',
  styleUrl: './sidebar-left.scss'
})
export class SidebarLeft {

  isOpenMenu: boolean = false;
  enteredMenu: boolean = false;
  theme: 'light' | 'dark' = 'light';
  menuItems: any[] = [];

  private sidebarService = inject(Sidebar);
  private themeService = inject(Theme);

  constructor() {

    this.themeService.theme$.subscribe((theme: 'light' | 'dark') => {
      this.theme = theme;
    })

    this.menuItems = [
      {
        name: 'Usuarios',
        routerLink: '/pages/users',
        icon: 'pi-users',
      },
      {
        name: 'Clientes',
        routerLink: '/pages/clients',
        icon: 'pi-building',
      },
      {
        name: 'Roles',
        routerLink: '/pages/roles',
        icon: 'pi-shield',
      },
    ]

  }

  ngOnInit(): void {
    this.sidebarService.sidebarVisible$.subscribe((isVisible) => {
      this.isOpenMenu = isVisible;
    });

    if (window.innerWidth <= 768) {
      this.sidebarService.closeSidebar();
    }
  }

  toggleMenu() {
    this.sidebarService.toggleSidebar();
  }

}
