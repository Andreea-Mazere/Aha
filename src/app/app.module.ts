import { environment } from '../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { WordsComponent } from './words/words.component';
import { WordsComponent as ContentWords } from "./content/words/words.component";
import { WordSlideComponent } from './words/word-slide/word-slide.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WordsService } from './words/words.service';
import { AuthenticationComponent } from './shell/authentication/authentication.component';
import { AuthenticationService } from './common/authentication/authentication.service';
import { ProfileComponent } from './shell/profile/profile.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core'; 
import { createTranslateLoader } from './translate/translate-loader.service';
import { ValidationErrorsComponent } from './common/validation-errors/validation-errors.component';
import {routes} from './app.routes';
import { StudentCanActivateGuard } from './common/guards/student-can-activate.guard';
import { ContentComponent } from './content/content.component';
import { AdminCanActivateGuard } from './common/guards/admin-can-activate.guard';
import { NavigationService } from './navigation/navigation.service';
import { DynamicHomeGuard } from './common/guards/dynamic-home-guard';

import { HttpModule } from "@angular/http"

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ListboxModule } from 'primeng/primeng'
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AngularFireStorageModule } from 'angularfire2/storage';

//todo support different environments depending on origin
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
    ValidationErrorsComponent,
    WordsComponent,
    WordSlideComponent,
    PageNotFoundComponent,
    ContentComponent,
    ContentWords
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader
      }
    }), 
    InputTextModule, ButtonModule, ListboxModule, FileUploadModule, 
    BrowserAnimationsModule, DialogModule
  ],
  providers: [AuthenticationService, 
    WordsService, 
    StudentCanActivateGuard, 
    AdminCanActivateGuard, 
    DynamicHomeGuard, 
    NavigationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

