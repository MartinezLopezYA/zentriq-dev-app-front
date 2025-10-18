import { Routes } from "@angular/router";

export const pageRoutes: Routes = [
  { path: 'main', loadComponent: () => import('./main/main').then(m => m.Main) },
  { path: 'profile', loadComponent: () => import('./profile/profile').then(m => m.Profile) },
];
