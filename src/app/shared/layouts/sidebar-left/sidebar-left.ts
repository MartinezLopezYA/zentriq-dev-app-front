import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-left',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-left.html',
  styleUrl: './sidebar-left.scss'
})
export class SidebarLeft {

  menuItems: any[] = [];

  constructor(
    private router: Router
  ) {

    this.menuItems = [
      {
        name: 'Clientes',
        routerLink: '/pages/clients',
        icon: 'pi-users',
      },
      {
        name: 'Usuarios',
        routerLink: '/pages/users',
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
