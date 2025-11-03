import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import GetWorkplaceJson from './workplace.model';
import GetEmployeeJson from './employee.model';
import { Weekday } from '../../../enums/Weekday';
import { Frequency } from '../../../enums/Frequency';

@Component({
  selector: 'app-shift-filter',
  imports: [],
  templateUrl: './shift-filter.html',
  styleUrl: './shift-filter.css',
})
export class ShiftFilter implements OnInit {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  private destroyRef = inject(DestroyRef);
  workplaces = signal<GetWorkplaceJson[] | null>(null);
  employees = signal<GetEmployeeJson[] | null>(null);
  weekday = Weekday;
  frequency = Frequency;
  days: Array<keyof typeof Weekday> = Object.keys(Weekday) as Array<keyof typeof Weekday>;
  frequencies: Array<keyof typeof Frequency> = Object.keys(Frequency) as Array<
    keyof typeof Frequency
  >;

  ngOnInit(): void {
    const workplaceSubscription = this.httpClient
      .get<GetWorkplaceJson[]>(`${this.baseUrl}/workplace/getall`)
      .subscribe({
        next: (resData) => {
          this.workplaces.set(resData);
        },
        error: (error) => {
          console.log(error);
        },
      });

    this.destroyRef.onDestroy(() => {
      workplaceSubscription.unsubscribe();
    });

    const employeeSubscription = this.httpClient
      .get<GetEmployeeJson[]>(`${this.baseUrl}/employee/getall`)
      .subscribe({
        next: (resData) => {
          this.employees.set(resData);
        },
        error: (error) => {
          console.log(error);
        },
      });

    this.destroyRef.onDestroy(() => {
      employeeSubscription.unsubscribe();
    });
  }
}
