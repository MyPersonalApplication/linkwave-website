import { Component } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent {
  photos = [
    {
      caption: 'Adda Timeline',
      number: '79',
      galleries: [
        'assets/images/photos/photo-7.jpg',
        'assets/images/photos/photo-8.jpg',
        'assets/images/photos/photo-9.jpg',
      ],
    },
    {
      caption: 'Upload',
      number: '134',
      galleries: [
        'assets/images/photos/photo-8.jpg',
        'assets/images/photos/photo-6.jpg',
        'assets/images/photos/photo-2.jpg',
      ],
    },
    {
      caption: 'Office Hangout',
      number: '12',
      galleries: [
        'assets/images/photos/photo-1.jpg',
        'assets/images/photos/photo-5.jpg',
        'assets/images/photos/photo-10.jpg',
      ],
    },
    {
      caption: 'Dream Land',
      number: '24',
      galleries: [
        'assets/images/photos/photo-2.jpg',
        'assets/images/photos/photo-8.jpg',
        'assets/images/photos/photo-11.jpg',
      ],
    },
    {
      caption: 'Travel Zone',
      number: '34',
      galleries: [
        'assets/images/photos/photo-3.jpg',
        'assets/images/photos/photo-6.jpg',
        'assets/images/photos/photo-4.jpg',
      ],
    },
    {
      caption: 'Pure Nature',
      number: '17',
      galleries: [
        'assets/images/photos/photo-4.jpg',
        'assets/images/photos/photo-9.jpg',
        'assets/images/photos/photo-6.jpg',
      ],
    },
    {
      caption: 'Family Tour',
      number: '37',
      galleries: [
        'assets/images/photos/photo-5.jpg',
        'assets/images/photos/photo-7.jpg',
        'assets/images/photos/photo-2.jpg',
      ],
    },
    {
      caption: 'Chill Zone',
      number: '6',
      galleries: [
        'assets/images/photos/photo-6.jpg',
        'assets/images/photos/photo-5.jpg',
        'assets/images/photos/photo-8.jpg',
      ],
    },
  ];
}
