import { Component, Input, OnInit } from '@angular/core';
import {
  faComments as faRegularComments,
  faHeart as faRegularHeart,
  faShareFromSquare as faRegularShareFromSquare,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { PostList } from 'src/app/models/post';
import * as AOS from 'aos';

@Component({
  selector: 'app-card-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class CardPostComponent implements OnInit {
  faRegularHeart = faRegularHeart;
  faSolidHeart = faSolidHeart;
  faRegularComments = faRegularComments;
  faRegularShareFromSquare = faRegularShareFromSquare;

  @Input() postList!: PostList[];

  constructor() {}

  ngOnInit() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
    });
  }

  likePost(postId: string) {
    const post = this.postList.find((post) => post.id === postId);
    if (post) {
      post.isLiked = !post.isLiked;
    }
  }
}
