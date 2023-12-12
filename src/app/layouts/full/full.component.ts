import { Component, Input } from '@angular/core';
import { UserInfo } from 'src/app/models/user';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
})
export class FullComponent {
  profile = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@gmail.com',
    },
    {
      id: '2',
      name: 'Quang Nguyen',
      email: 'quang@gmail.com',
    },
  ];

  constructor() {
    console.log(this.profile);
  }

  onClick() {
    console.log('Clicked');
  }
}
