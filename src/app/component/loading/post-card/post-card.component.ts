import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {
  @Input() count: number = 1;

  range(count: number): number[] {
    return Array(count)
      .fill(0)
      .map((_, index) => index + 1);
  }
}
