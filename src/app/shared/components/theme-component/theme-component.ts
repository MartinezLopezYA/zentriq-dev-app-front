import { Component, inject } from '@angular/core';
import { Theme } from '../../../core/services/global/theme';

@Component({
  selector: 'app-theme-component',
  imports: [],
  template: `
      <div class="flex gap-2">
        @if(theme === 'dark') {
          <i class="pi pi-inbox text-(--alternative) text-lg"></i>
          <button type="button" (click)="toggleTheme()" class="custom-theme">
            <i class="pi pi-sun text-(--alternative) text-lg"></i>
          </button>
        }@else {
          <i class="pi pi-inbox text-(--alternative) lg:text-text-(--alternative) text-lg"></i>
          <button type="button" (click)="toggleTheme()" class="custom-theme">
            <i class="pi pi-moon text-(--alternative) lg:text-text-(--alternative) text-lg"></i>
          </button>
        }
      </div>
  `
})
export class ThemeComponet {

  theme: 'light' | 'dark' = 'light';

  private themeService = inject(Theme);

  constructor() {}

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme: 'light' | 'dark') => {
      this.theme = theme;
    })
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

}
