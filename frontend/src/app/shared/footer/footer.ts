import { DatePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'footer[Footer]',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit {
  date = signal(this.formatDate());

  ngOnInit(): void {
    setInterval(() => {
      this.date.set(this.formatDate());
    }, 1000);
  }

  private formatDate(): string {
    const now = new Date();

    const day = now.getDate();
    const month = now.toLocaleString('en-US', { month: 'short' });
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    const formatted = `${day} ${month} ${year}, ${hours}:${minutes}`;

    return formatted;
  }
}
