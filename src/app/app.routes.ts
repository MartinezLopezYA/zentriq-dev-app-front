import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.routes').then(m => m.authRoutes) },
  { path: 'pages', loadChildren: () => import('./modules/pages/pages.routes').then(m => m.pageRoutes) },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' }
];
