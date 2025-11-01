import { Component, OnInit } from '@angular/core';
import { Theme } from '../../../core/services/global/theme';

@Component({
  selector: 'app-theme-component',
  imports: [],
  template: `
      <div class="flex gap-2">
        @if(theme === 'dark') {
          <i class="pi pi-inbox text-white text-lg"></i>
          <button type="button" (click)="toggleTheme()" class="custom-theme">
            <i class="pi pi-sun text-white text-lg"></i>
          </button>
        }@else {
          <i class="pi pi-inbox text-(--neutral-text) lg:text-(--neutral-text-two) text-lg"></i>
          <button type="button" (click)="toggleTheme()" class="custom-theme">
            <i class="pi pi-moon text-(--neutral-text) lg:text-(--neutral-text-two) text-lg"></i>
          </button>
        }
      </div>
  `
})
export class ThemeComponet implements OnInit {

  theme: 'light' | 'dark' = 'light';

  constructor(
    private themeService: Theme
  ) {}

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme: 'light' | 'dark') => {
      this.theme = theme;
    })
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

}
