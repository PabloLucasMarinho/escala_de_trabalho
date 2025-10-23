import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventService {
  editToggle = signal(false);
  addEmployee = signal(false);
  addWorkplace = signal(false);

  triggerEditing() {
    this.editToggle.update((value) => !value);
  }

  triggerAddEmployee() {
    this.addEmployee.update((value) => !value);
    this.addWorkplace.set(false);
  }

  triggerAddWorkplace() {
    this.addWorkplace.update((value) => !value);
    this.addEmployee.set(false);
  }
}
