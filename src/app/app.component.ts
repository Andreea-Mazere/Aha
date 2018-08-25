import { Component, ViewEncapsulation } from '@angular/core';
import { TranslatePipe, TranslateService} from '@ngx-translate/core';
import { NavigationService } from './navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [TranslateService, TranslatePipe]//todo: try to move in app.module
})
export class AppComponent {
  constructor (translateService: TranslateService, 
    navigationService: NavigationService) {
      navigationService.init();
      let defaultLanguage = 'ro-RO';
      translateService.setDefaultLang(defaultLanguage);
      translateService.use(defaultLanguage); 
      // let headers = new Headers();
      // headers.append('Authorization', "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImZmNTRmZjM0MTFiZmMwMDJiYTBjZDAwNzA2YmEzYmM4NTBiZWIwMmIifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYWhhLWRldi1lbnZpcm9ubWVudCIsIm5hbWUiOiJDcmVhdG9ycyIsImFkbWluIjp0cnVlLCJhdWQiOiJhaGEtZGV2LWVudmlyb25tZW50IiwiYXV0aF90aW1lIjoxNTMzNTYxMDY2LCJ1c2VyX2lkIjoiQTAyTHI2OHF1ZmFmanN0T0NWNHNaeGpiT1d2MSIsInN1YiI6IkEwMkxyNjhxdWZhZmpzdE9DVjRzWnhqYk9XdjEiLCJpYXQiOjE1MzM1NjEwNjYsImV4cCI6MTUzMzU2NDY2NiwiZW1haWwiOiJjcmVhdG9ycy5haGFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiY3JlYXRvcnMuYWhhQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Ve8In-ItGASK-rHViKFvN5BEuKbJUj41jpYJrLvf29Xoh0Ulax5Zh8I7l86aUAhDkZH1MLBWwoBNv5wDKse3Vb4CoZUR4u0eCdsEd2AZ-G4CEuuufdeF3lc3Vkyk57zdQNhazv8KgYg4rkkZpcAI3lKZMMSU-rQlz6IXztYN1DS-L47NIdC1nnIuLgaGjiGLeSf0rvkNWBTcxUKaEmPpuRawoPEWf8Od5fQqg9Cuwcm27z7k_B2DYtbrsQoYmHay-iKCFfUQD9CGI-2BkkVqVcNqrchvKk3PyNljCi_abxLzNeXXyGei2jUTM7lrrTSORBaokoqLQtyyvsJfw-wEgA"); 
      // console.log('headers:', headers);
      // http.post("https://us-central1-aha-dev-environment.cloudfunctions.net/api/test", null,
      // {
      //   headers: headers
      // }).map(r => {
      //   console.log('!! got response: ', r);
      // })
      // .subscribe();
  }
  title = 'app';
}
