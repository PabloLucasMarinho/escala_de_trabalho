import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventService {
  toggle = signal(false);
  editToggle = signal(false);

  triggerToggle() {
    this.toggle.update((value) => !value);
  }

  triggerEditing() {
    this.editToggle.update((value) => !value);
  }
}
