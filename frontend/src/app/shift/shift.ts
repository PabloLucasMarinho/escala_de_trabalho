import { Component, inject } from '@angular/core';
import { DisplayShifts } from './display-shifts/display-shifts';
import { EventService } from '../services/event.service';
import { AddEmployee } from '../forms/add/add-employee/add-employee';
import { AddWorkplace } from '../forms/add/add-workplace/add-workplace';

@Component({
  selector: 'app-shift',
  imports: [DisplayShifts, AddEmployee, AddWorkplace],
  templateUrl: './shift.html',
  styleUrl: './shift.css',
})
export class Shift {
  event = inject(EventService);
}
