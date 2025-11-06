import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.routes').then(m => m.authRoutes) },
  { path: 'pages', component: MainLayout, loadChildren: () => import('./modules/pages/pages.routes').then(m => m.pageRoutes) },
  { path: '', redirectTo: 'pages/main', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/main' }
];
