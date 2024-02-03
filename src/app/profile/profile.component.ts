import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileId: string = '';
  pages = [
    {
      text: 'Timeline',
      url: 'timeline',
    },
    {
      text: 'About',
      url: 'about',
    },
    {
      text: 'Photos',
      url: 'photos',
    },
    {
      text: 'Friends',
      url: 'friends',
    },
    {
      text: 'More',
      url: 'more',
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.profileId = id;
    console.log(id);
  }
}
