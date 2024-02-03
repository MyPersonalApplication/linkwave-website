import { Component } from '@angular/core';
import {
  faFacebook as faBrandFacebook,
  faGithub as faBrandGithub,
  faLinkedin as faBrandLinkedin,
  faInstagramSquare as faBrandInstagram,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  faBrandFacebook = faBrandFacebook;
  faBrandGithub = faBrandGithub;
  faBrandLinkedin = faBrandLinkedin;
  faBrandInstagram = faBrandInstagram;
}
