import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() count: number = 1;

  range(count: number): number[] {
    return Array(count)
      .fill(0)
      .map((_, index) => index + 1);
  }
}
