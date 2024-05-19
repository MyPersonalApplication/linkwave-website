import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss'],
})
export class FriendCardComponent {
  @Input() count: number = 1;

  range(count: number): number[] {
    return Array(count)
      .fill(0)
      .map((_, index) => index + 1);
  }
}
