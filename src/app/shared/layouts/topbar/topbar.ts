import { Component, OnInit } from '@angular/core';
import { Theme } from '../../../core/services/global/theme';
import { UserLoginResponseInterface } from '../../../core/interfaces/user.interface';
import { User } from '../../../core/services/user';
import { Alerts } from '../../../core/services/global/alerts';

@Component({
  selector: 'app-topbar',
  imports: [],
  template: `
    <div class="w-full h-(--topbar-height) p-section">
      <div class="w-full h-full flex justify-between items-center bg-(--card-bg) rounded-lg px-8">
        @if(theme === 'light') {
          <img src="/images/Logo Completo Light.png" alt="">
        }@else {
          <img src="/images/Logo Completo Dark.png" alt="">
        }
        <div class="flex items-center gap-3">
          <div class="flex flex-col justify-center items-end">
            <span class="text-roboto font-bold text-sm text-(--neutral-text)">{{ user?.firstname }} {{ user?.lastname}}</span>
            <span class="text-poppins text-xs text-(--neutral-text)">{{ roles.join(', ') }}</span>
          </div>
          <img class="w-8 h-8 rounded-full object-cover" src="https://i.pravatar.cc/300" alt="User Avatar">
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
export class Topbar implements OnInit {

  theme: 'light' | 'dark' = 'light';
  user: UserLoginResponseInterface | null = null;
  roles: string[] = [];


  constructor(
    private themeService: Theme,
    private userService: User,
    private alertService: Alerts,
  ) { }

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

}
