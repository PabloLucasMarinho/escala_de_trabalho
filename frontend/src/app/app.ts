import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';
import { Navbar } from './shared/navbar/navbar';
import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';

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
}
