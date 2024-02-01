import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-profile',
  templateUrl: './nav-profile.component.html',
  styleUrls: ['./nav-profile.component.scss'],
})
export class NavProfileComponent {
  pages = [
    {
      text: 'Timeline',
      url: '/profile',
    },
    {
      text: 'About',
      url: '/about',
    },
    {
      text: 'Photos',
      url: '/photos',
    },
    {
      text: 'Friends',
      url: '/friends',
    },
    {
      text: 'More',
      url: '/more',
    },
  ];
}
