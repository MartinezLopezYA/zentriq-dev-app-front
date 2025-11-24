import { Component, inject } from '@angular/core';
import { Topbar } from '../../shared/layouts/topbar/topbar';
import { SidebarLeft } from '../../shared/layouts/sidebar-left/sidebar-left';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../core/services/components/sidebar';
import { CommonModule } from '@angular/common';

const COMPONENTS = [Topbar, SidebarLeft];

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, RouterOutlet, ...COMPONENTS],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayout {

  isOpenMenu: boolean = false;
  enteredMenu: boolean = false;

  private sidebarService = inject(Sidebar);

  ngOnInit(): void {
    this.sidebarService.sidebarVisible$.subscribe((isVisible) => {
      this.isOpenMenu = isVisible;
    });

    if (window.innerWidth <= 768) {
      this.sidebarService.closeSidebar();
    }
  }

}
