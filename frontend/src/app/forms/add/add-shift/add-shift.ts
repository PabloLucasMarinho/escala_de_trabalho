import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'form-add-shift',
  imports: [ReactiveFormsModule],
  templateUrl: './add-shift.html',
  styleUrl: './add-shift.css',
})
export class AddShift {
  event = inject(EventService);
}
