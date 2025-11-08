import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './guards/auth.guard';
import { Profile } from './profile/profile';
import { Login } from './forms/login/login';
import { RegisterUser } from './forms/create/register-user/register-user';
import { RegisterShift } from './forms/create/register-shift/register-shift';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: RegisterUser },
  { path: '', component: Dashboard, canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'shift/register', component: RegisterShift, canActivate: [authGuard] },
];
