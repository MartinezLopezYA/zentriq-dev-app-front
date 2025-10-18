import { Component, OnInit } from '@angular/core';
import { Theme } from '../../../core/services/global/theme';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss'
})
export class Topbar implements OnInit {

  theme: 'light' | 'dark' = 'light';

  constructor(
    private themeService: Theme
  ) {}

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme: 'light' | 'dark') => {
      this.theme = theme;
    })
  }

}
