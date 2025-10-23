import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './guards/auth.guard';
import { RegisterUser } from './register/register-user/register-user';
import { Profile } from './profile/profile';
import { Shift } from './shift/shift';
import { LogoutComponent } from './shared/logout-component/logout-component';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: RegisterUser },
  { path: '', component: Dashboard, canActivate: [authGuard], data: { title: 'Calendário' } },
  { path: 'profile', component: Profile, canActivate: [authGuard], data: { title: 'Perfil' } },
  { path: 'shift', component: Shift, canActivate: [authGuard], data: { title: 'Turnos' } },
  { path: 'logout', component: LogoutComponent },
];
