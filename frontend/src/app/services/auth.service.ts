import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { RefreshTokenJson } from '../token.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = environment.apiUrl;
  token = signal<string | null>(localStorage.getItem('token'));
  refreshToken = signal<string | null>(localStorage.getItem('refresh-token'));

  setToken(token: string, refreshToken: string) {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('refresh-token', refreshToken);
      this.token.set(token);
      this.refreshToken.set(refreshToken);
    } catch (error) {
      console.error('Erro ao salvar tokens', error);
    }
  }

  refreshOnInit(): Promise<void> {
    return new Promise((resolve) => {
      const refreshToken = localStorage.getItem('refresh-token');
      if (!refreshToken) return resolve();

      this.httpClient
        .post<RefreshTokenJson>(`${this.baseUrl}/token/refresh-token`, { refreshToken })
        .subscribe({
          next: (resData) => {
            localStorage.setItem('refresh-token', resData.refreshToken);
            localStorage.setItem('token', resData.accessToken);
            resolve();
          },
          error: () => {
            this.router.navigate(['/login']);
            resolve();
          },
        });
    });
  }

  clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    this.token.set(null);
    this.refreshToken.set(null);
  }

  hasToken = computed(() => this.token() !== null);
  hasRefreshToken = computed(() => this.refreshToken() !== null);
}
