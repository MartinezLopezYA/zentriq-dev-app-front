import { Component } from '@angular/core';
import { Topbar } from '../../shared/components/topbar/topbar';
import { SidebarLeft } from '../../shared/components/sidebar-left/sidebar-left';
import { SidebarRight } from '../../shared/components/sidebar-right/sidebar-right';
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
