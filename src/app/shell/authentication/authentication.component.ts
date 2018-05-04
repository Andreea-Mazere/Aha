import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  user: Observable<firebase.User>;

  form: FormGroup;

  constructor(
    public afAuth: AngularFireAuth,
    formBuilder: FormBuilder) {
    this.user = this.afAuth.authState;
    this.form = formBuilder.group({
      'email': ["", Validators.required],
      'password': ["", Validators.required]
    });
  }

  login() { 
    this.afAuth.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.password);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit() {
  }

}
