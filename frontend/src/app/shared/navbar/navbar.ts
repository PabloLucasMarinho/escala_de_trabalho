import { Component, inject, input, signal } from '@angular/core';
import { EventService } from '../../services/event.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nav[Navbar]',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  event = inject(EventService);
  userName = input<string>(localStorage.getItem('user-name')!);
  splitUserName: string[] = this.userName().split(' ');
  initalLetters: string = `${this.splitUserName[0][0]}${this.splitUserName[1][0]}`;
}
