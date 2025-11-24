import { Routes } from "@angular/router";
import { authGuard } from "../../core/guards/auth-guard";

export const pageRoutes: Routes = [
  { path: 'main', loadComponent: () => import('./main/main').then(m => m.Main), canActivate: [authGuard], data: { title: 'Inicio | ZentriqDev' } },
  { path: 'profile', loadComponent: () => import('./profile/profile').then(m => m.Profile), canActivate: [authGuard], data: { title: 'Perfil | ZentriqDev' } },
  { path: 'users', loadComponent: () => import('./users/users').then(m => m.Users), canActivate: [authGuard], data: { title: 'Usuarios | ZentriqDev' } },
  { path: 'roles', loadComponent: () => import('./roles/roles').then(m => m.Roles), canActivate: [authGuard], data: { title: 'Roles | ZentriqDev' } },
  { path: '', redirectTo: 'pages/main', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/main' }
];
