import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  profileId: string = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.profileId = id;
    console.log(id);
  }
}
