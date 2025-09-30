import { Routes } from '@angular/router';
import { Login } from './login/login';
import { authGuard } from './guards/auth.guard';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canMatch: [authGuard],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
