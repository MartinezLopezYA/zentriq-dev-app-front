import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-left',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-left.html',
  styleUrl: './sidebar-left.scss'
})
export class SidebarLeft {

  menuItems: any[] = [];

  constructor() {

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



}
