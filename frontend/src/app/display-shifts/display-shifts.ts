import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-display-shifts',
  imports: [],
  templateUrl: './display-shifts.html',
  styleUrl: './display-shifts.css',
})
export class DisplayShifts implements OnInit {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private baseUrl = environment.apiUrl;

  ngOnInit(): void {
    const subscription = this.httpClient.get(`${this.baseUrl}/shift/getshift`).subscribe({
      next: (resData) => {
        console.log(resData);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
