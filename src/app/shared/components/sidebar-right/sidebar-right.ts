import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Theme } from '../../../core/services/global/theme';
import { UserLoginResponseInterface } from '../../../core/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.html',
  styleUrl: './sidebar-right.scss'
})
export class SidebarRight {

  theme: 'light' | 'dark' = 'light';
  user: UserLoginResponseInterface | null = null;

  constructor(
    private themeService: Theme,
    private authService: Auth,
    private router: Router
  ) {
    this.themeService.theme$.subscribe((theme: 'light' | 'dark') => {
      this.theme = theme;
    })
  }

  ngOnInit(): void {
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      }, error: () => {
        // this.router.navigate(['/auth/login']);
      }
    })
  }

}
