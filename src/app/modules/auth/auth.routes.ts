import { Routes } from "@angular/router";
import { noAuthGuard } from "../../core/guards/no-auth-guard";

export const authRoutes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login').then(m => m.Login), canActivate: [noAuthGuard]},
];
