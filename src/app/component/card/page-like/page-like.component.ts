import { Component } from '@angular/core';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-page-like',
  templateUrl: './page-like.component.html',
  styleUrls: ['./page-like.component.scss'],
})
export class PageLikeComponent {
  faRegularHeart = faRegularHeart;
}
