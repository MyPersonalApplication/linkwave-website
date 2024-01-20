import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LinkWave';

  constructor(private translate: TranslateService) {
    //default language
    this.translate.setDefaultLang('en');
  }
}
