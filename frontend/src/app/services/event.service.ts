import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventService {
  toggle = signal(false);

  triggerToggle() {
    this.toggle.update((value) => !value);
  }
}
