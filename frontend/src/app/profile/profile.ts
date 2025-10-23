import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GetUserJson } from './response.model';
import { NameEmail } from '../forms/edit/name-email/name-email';
import { Password } from '../forms/edit/password/password';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, NameEmail, Password],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private auth = inject(AuthService);
  private baseUrl = environment.apiUrl;
  name = signal('');
  email = signal('');

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    const subscription = this.httpClient
      .get<GetUserJson>(`${this.baseUrl}/user/getuser`)
      .subscribe({
        next: (resData) => {
          this.name.set(resData.name);
          this.email.set(resData.email);
        },
        error: (error) => {
          console.log(error.error.error);
          if (error.error.error == 'Token inválido.') {
            this.auth.clearToken();
            this.router.navigate(['/login']);
          }
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
