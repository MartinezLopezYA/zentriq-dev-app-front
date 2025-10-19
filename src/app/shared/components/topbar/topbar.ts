import { Component, OnInit } from '@angular/core';
import { Theme } from '../../../core/services/global/theme';
import { UserLoginResponseInterface } from '../../../core/interfaces/user.interface';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-topbar',
  imports: [],
  template: `
    <div class="w-full h-[var(--topbar-height)] p-section">
      <div class="w-full h-full flex justify-between items-center bg-[var(--card-bg)] rounded-lg px-8">
        @if(theme === 'light') {
          <img src="/images/Logo Completo Light.png" alt="">
        }@else {
          <img src="/images/Logo Completo Dark.png" alt="">
        }
        <div class="flex items-center gap-3">
          <div class="flex flex-col justify-center items-end">
            <span class="text-gotham font-bold text-[var(--neutral-text)]">{{ user?.firstname }} {{ user?.lastname}}</span>
            <span class="text-flama text-sm text-[var(--neutral-text)]">{{ roles.join(', ') }}</span>
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
    private authService: Auth
  ) { }

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme: 'light' | 'dark') => {
      this.theme = theme;
    });

    // this.authService.user$.subscribe((user: UserLoginResponseInterface | null) => {
    //   this.user = user;
    // });

    // this.authService.roles$.subscribe((roles: string[]) => {
    //   this.roles = roles;
    // });
  }

}
