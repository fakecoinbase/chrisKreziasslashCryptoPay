import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  constructor() {}

  formatDate(date: Date): string {
    const month =
      date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return `${date.getFullYear()}-${month}-${day}`;
  }

  unsubscribe(subscriptions: Subscription[]) {
    // tslint:disable-next-line: no-unused-expression
    subscriptions &&
      subscriptions.length &&
      subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
