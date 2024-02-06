import { Component } from '@angular/core';
import {
  faFacebook as faBrandFacebook,
  faGithub as faBrandGithub,
  faLinkedin as faBrandLinkedin,
  faInstagramSquare as faBrandInstagram,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
})
export class MoreComponent {
  faBrandFacebook = faBrandFacebook;
  faBrandGithub = faBrandGithub;
  faBrandLinkedin = faBrandLinkedin;
  faBrandInstagram = faBrandInstagram;

  constructor() {}

  favoriteBooks = [
    {
      image: 'assets/avatar/my-avatar-4.jpg',
      url: '#',
    },
    {
      image: 'assets/images/books/book-2.jpg',
      url: '#',
    },
    {
      image: 'assets/images/books/book-3.jpg',
      url: '#',
    },
    {
      image: 'assets/images/books/book-4.jpg',
      url: '#',
    },
    {
      image: 'assets/images/books/book-5.jpg',
      url: '#',
    },
    {
      image: 'assets/images/books/book-6.jpg',
      url: '#',
    },
  ];

  favoriteSports = [
    {
      image: 'assets/avatar/my-avatar-4.jpg',
      url: '#',
    },
    {
      image: 'assets/images/sports/sport-2.jpg',
      url: '#',
    },
    {
      image: 'assets/images/sports/sport-3.jpg',
      url: '#',
    },
    {
      image: 'assets/images/sports/sport-4.jpg',
      url: '#',
    },
    {
      image: 'assets/images/sports/sport-5.jpg',
      url: '#',
    },
    {
      image: 'assets/images/sports/sport-6.jpg',
      url: '#',
    },
  ];
}
