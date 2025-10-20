import { Component } from '@angular/core';
import { DisplayShifts } from '../display-shifts/display-shifts';

@Component({
  selector: 'app-shift',
  imports: [DisplayShifts],
  templateUrl: './shift.html',
  styleUrl: './shift.css',
})
export class Shift {}
