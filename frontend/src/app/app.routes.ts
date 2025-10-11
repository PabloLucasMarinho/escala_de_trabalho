import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './guards/auth.guard';
import { RegisterUser } from './register/register-user/register-user';

export const routes: Routes = [
  { path: '', component: Dashboard, canActivate: [authGuard] },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: RegisterUser,
  },
];
