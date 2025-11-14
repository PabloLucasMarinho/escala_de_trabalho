import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
<<<<<<< Updated upstream
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth-interceptor';
import { AuthService } from './services/auth.service';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
=======
>>>>>>> Stashed changes
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
<<<<<<< Updated upstream
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.refreshOnInit();
    }),
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
=======
>>>>>>> Stashed changes
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
  ],
};
