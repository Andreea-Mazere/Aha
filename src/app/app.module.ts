import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './shell/authentication/authentication.component';

// Attach firebase to window so FirebaseUI can access it
//(<any>window).firebase = firebase

var firebaseConfig = {
  apiKey: "AIzaSyAlVylOFYkMZquZ_YCRnqC0rgekme7Rle8",
  authDomain: "aha-dev-environment.firebaseapp.com",
  databaseURL: "https://aha-dev-environment.firebaseio.com",
  projectId: "aha-dev-environment",
  storageBucket: "aha-dev-environment.appspot.com",
  messagingSenderId: "516676519628"
};
//firebase.initializeApp(config);

// Import FirebaseUI standalone (as its npm.js file causes double firebase code)
//import 'firebaseui/dist/firebaseui'  // Imports for side effects only

// Declare `window.firebaseui` that the above import creates
// declare global {
//     const firebaseui
// }


//var ui = new firebaseui.auth.AuthUI(firebase.auth());

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
