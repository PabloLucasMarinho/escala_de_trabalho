import { Component, computed, signal, Signal, WritableSignal } from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {
  today: Signal<DateTime> = signal(DateTime.local());
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(this.today().startOf('month'));
  activeDay: WritableSignal<DateTime | null> = signal(null);
  weekDays: Signal<string[]> = signal([
    ...Info.weekdays('short').slice(-1),
    ...Info.weekdays('short').slice(0, -1),
  ]);
  daysOfMonth: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week', { useLocaleWeeks: true }),
      this.firstDayOfActiveMonth().endOf('month').endOf('week', { useLocaleWeeks: true })
    )
      .splitBy({ day: 1 })
      .map((d) => {
        if (d.start === null) {
          throw new Error('Data errada.');
        }
        return d.start;
      });
  });

  goToPreviousMonth(): void {
    this.firstDayOfActiveMonth.set(this.firstDayOfActiveMonth().minus({ month: 1 }));
  }

  goToNextMonth(): void {
    this.firstDayOfActiveMonth.set(this.firstDayOfActiveMonth().plus({ month: 1 }));
  }

  goToToday(): void {
    this.firstDayOfActiveMonth.set(this.today().startOf('month'));
  }
}
