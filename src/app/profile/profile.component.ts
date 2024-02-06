import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Page {
  text: string;
  url: string;
  isActive: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private profileId: string = '';

  pages: Page[] = [
    { text: 'Timeline', url: 'timeline', isActive: true },
    { text: 'About', url: 'about', isActive: false },
    { text: 'Photos', url: 'photos', isActive: false },
    { text: 'Friends', url: 'friends', isActive: false },
    { text: 'More', url: 'more', isActive: false },
  ];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.setProfileId();
    this.setActivePage();
  }

  setProfileId(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.profileId = id;
  }

  setActivePage(): void {
    const page = this.activatedRoute.firstChild?.snapshot.url[0].path;
    this.pages.forEach((p) => (p.isActive = false));
    const selectedPage = this.pages.find((p) => p.url === page);
    if (selectedPage) {
      selectedPage.isActive = true;
    }
  }

  onClick(page: Page): void {
    this.pages.forEach((p) => (p.isActive = false));
    page.isActive = true;
  }
}
