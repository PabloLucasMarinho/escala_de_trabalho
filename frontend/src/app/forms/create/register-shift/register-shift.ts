import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import GetWorkplaceJson from '../../filter/shift-filter/workplace.model';
import GetEmployeeJson from '../../filter/shift-filter/employee.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Weekday } from '../../../enums/Weekday';
import { Frequency } from '../../../enums/Frequency';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-shift',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatTimepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register-shift.html',
  styleUrl: './register-shift.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterShift implements OnInit {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private baseUrl = environment.apiUrl;
  workplaces = signal<GetWorkplaceJson[] | null>(null);
  employees = signal<GetEmployeeJson[] | null>(null);
  weekday = Weekday;
  frequency = Frequency;
  days: Array<keyof typeof Weekday> = Object.keys(Weekday) as Array<keyof typeof Weekday>;
  frequencies: Array<keyof typeof Frequency> = Object.keys(Frequency) as Array<
    keyof typeof Frequency
  >;
  selectedWeekday = '';
  selectedFrequency = '';
  selectedWorkplace = '';
  selectedEmployee = '';
  isEditingWorkplace = false;
  workplaceName = '';

  shiftForm = new FormGroup({});

  onSubmit() {}

  editHandle() {
    this.isEditingWorkplace = true;
  }

  closeHandle() {
    this.isEditingWorkplace = false;
  }

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
