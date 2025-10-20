import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ShiftJson } from './response.model';
import { AddShift } from '../../forms/add/add-shift/add-shift';

@Component({
  selector: 'app-display-shifts',
  imports: [AddShift],
  templateUrl: './display-shifts.html',
  styleUrl: './display-shifts.css',
})
export class DisplayShifts implements OnInit {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private baseUrl = environment.apiUrl;
  shifts = signal<ShiftJson[] | null>([]);
  isAddingShift = signal<boolean>(false);

  ngOnInit(): void {
    const subscription = this.httpClient.get(`${this.baseUrl}/shift/getshift`).subscribe({
      next: (resData) => {
        if (!resData) return this.shifts.set(resData);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  handleAddShift() {
    this.isAddingShift.update((value) => !value);
  }
}
