import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './shell/authentication/authentication.component';
import { AuthenticationService } from './shell/authentication/authentication.service';
import { ProfileComponent } from './shell/profile/profile.component';

import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core'; 
import { createTranslateLoader } from './translate/translate-loader.service';
import { ValidationErrorsComponent } from './common/validation-errors/validation-errors.component'

var firebaseConfig = {
  apiKey: "AIzaSyAlVylOFYkMZquZ_YCRnqC0rgekme7Rle8",
  authDomain: "aha-dev-environment.firebaseapp.com",
  databaseURL: "https://aha-dev-environment.firebaseio.com",
  projectId: "aha-dev-environment",
  storageBucket: "aha-dev-environment.appspot.com",
  messagingSenderId: "516676519628"
};

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    ProfileComponent,
    ValidationErrorsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader
      }
      }), 
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

