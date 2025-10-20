import { Component, computed, inject, input } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'nav[Navbar]',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private auth = inject(AuthService);
  event = inject(EventService);
  private router = inject(Router);
  userName = input<string | null>(localStorage.getItem('user-name'));
  firstAndLastName = computed(() => {
    const name = this.userName();

    if (!name) return null;

    const parts = name.split(' ').filter((p) => p.length > 0);
    const first = parts[0];
    const last = parts.length > 1 ? parts[parts.length - 1] : '';

    return `${first} ${last}`;
  });
  initials = computed(() => {
    const name = this.userName();

    if (!name) return null;

    const parts = name.split(' ').filter((p) => p.length > 0);
    const first = parts[0][0];
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';

    return `${first}${last}`;
  });

  exit() {
    this.auth.clearToken();

    this.router.navigate(['/login']);
  }
}
