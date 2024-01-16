import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  dismissAll(): void {
    const notificationCards = document.querySelectorAll('.notification-card');
    notificationCards.forEach((card) => {
      card.classList.add('display-none');
    });
    const row = document.querySelector('.notification-container');
    const message = document.createElement('h4');
    message.classList.add('text-center');
    message.innerHTML = 'All caught up!';
    if (row) {
      row.appendChild(message);
    }
  }

  dismissNotification(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const parent = target.closest('.notification-card');
    if (parent) {
      parent.classList.add('display-none');
    }
  }
}
