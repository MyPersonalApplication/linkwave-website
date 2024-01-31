import { Component, Input } from '@angular/core';
import {
  faComments as faRegularComments,
  faHeart as faRegularHeart,
  faShareFromSquare as faRegularShareFromSquare,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { PostList } from 'src/app/models/post';

@Component({
  selector: 'app-card-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class CardPostComponent {
  faRegularHeart = faRegularHeart;
  faSolidHeart = faSolidHeart;
  faRegularComments = faRegularComments;
  faRegularShareFromSquare = faRegularShareFromSquare;

  @Input() postList!: PostList[];
}
