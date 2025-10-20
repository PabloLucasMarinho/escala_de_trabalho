import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';
import { Navbar } from './shared/navbar/navbar';
import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private auth = inject(AuthService);
  private event = inject(EventService);
  hasToken = this.auth.hasToken;
  isVisible = computed(() => this.event.toggle());
  pageTitle = signal('');

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const currentRoute = this.router.routerState.root;
      this.setPageTitleFromRoute(currentRoute);
    });
  }

  private setPageTitleFromRoute(route: ActivatedRoute) {
    let child = route.firstChild;
    while (child) {
      if (child.snapshot.data?.['title']) {
        this.pageTitle.set(child.snapshot.data['title']);
        return;
      }
      child = child.firstChild;
    }
    this.pageTitle.set('');
  }
}
