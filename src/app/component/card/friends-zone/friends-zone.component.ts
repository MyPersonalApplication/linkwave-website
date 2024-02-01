import { Component } from '@angular/core';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-friends-zone',
  templateUrl: './friends-zone.component.html',
  styleUrls: ['./friends-zone.component.scss'],
})
export class FriendsZoneComponent {
  faRegularHeart = faRegularHeart;
}
