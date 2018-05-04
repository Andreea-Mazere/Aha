import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  userName: Observable<string>;
  loggedIn: Observable<boolean>;
  loginFormVisible: Observable<boolean>;

  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private service: AuthenticationService) {
    this.userName = service.user.map(u => u.name);
    this.loggedIn = service.user.map(u => u.isAuthenticated);
    this.loginFormVisible = this.loggedIn.map(l => !l);
    this.form = formBuilder.group({
      'email': ["", Validators.required],
      'password': ["", Validators.required]
    });
  }

  login() {
    this.service.logInWithEmailAndPassword(this.form.value.email, this.form.value.password);
  }

  logout() {
    this.service.logOut();
  }

  ngOnInit() {
  }

}
