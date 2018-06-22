import { Component, ViewEncapsulation } from '@angular/core';
import { TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [TranslateService, TranslatePipe]//todo: try to move in app.module
})
export class AppComponent {
  constructor (translateService: TranslateService) {
    let defaultLanguage = 'ro-RO';
    translateService.setDefaultLang(defaultLanguage);
    translateService.use(defaultLanguage); 
  }
  title = 'app';
}
