import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Navbar } from '../shared/navbar/navbar';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  private destroyRef = inject(DestroyRef);
  private auth = inject(AuthService);
  private route = inject(Router);

  ngOnInit(): void {
    const subscription = this.httpClient.get(`${this.baseUrl}/user/getuser`).subscribe({
      error: (error) => {
        if (error.error.error === 'Token inválido.') {
          this.auth.clearToken();
          this.route.navigate(['/login']);
        }
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
