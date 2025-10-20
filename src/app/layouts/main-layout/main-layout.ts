import { Component } from '@angular/core';
import { Topbar } from '../../shared/layouts/topbar/topbar';
import { SidebarLeft } from '../../shared/layouts/sidebar-left/sidebar-left';
import { SidebarRight } from '../../shared/layouts/sidebar-right/sidebar-right';
import { RouterOutlet } from '@angular/router';

const COMPONENTS = [Topbar, SidebarLeft, SidebarRight];

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, ...COMPONENTS],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayout {

}
