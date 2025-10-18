import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  token = signal<string | null>(localStorage.getItem('token'));

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token.set(token);
  }

  clearToken() {
    localStorage.removeItem('token');
    this.token.set(null);
  }

  hasToken() {
    return this.token() !== null;
  }
}
