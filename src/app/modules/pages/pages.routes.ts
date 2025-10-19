import { Routes } from "@angular/router";
import { authGuard } from "../../core/guards/auth-guard";

export const pageRoutes: Routes = [
  { path: 'main', loadComponent: () => import('./main/main').then(m => m.Main), canActivate: [authGuard] },
  { path: 'profile', loadComponent: () => import('./profile/profile').then(m => m.Profile), canActivate: [authGuard] },
];
