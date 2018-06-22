import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
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
    private service: AuthenticationService
  ) {
    this.userName = service.user.map(u => u.name);
    this.loggedIn = service.user.map(u => u.isAuthenticated);
    this.loginFormVisible = this.loggedIn.map(l => !l);
    this.form = formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login() {
    this.service.logInWithEmailAndPassword(this.form.value.email, this.form.value.password)
    .catch(e => {
      console.log('error logging in', e);
      let control = this.getFormControlByErrorCode(e.code);
      let errors = control.errors || {};
      let newError = {};
      newError[e.code] = true;
      Object.assign(errors, newError);
      control.setErrors(errors);
    });
  }

  logout() {
    this.service.logOut();
  }

  private getFormControlByErrorCode(code): AbstractControl {
    switch (code) {
      case 'auth/wrong-password':
        return this.form.get('password');
      case 'auth/invalid-email':
      case 'auth/user-not-found':
        return this.form.get('email');
      default: 
        return this.form;
    }
  }

  ngOnInit() {
  }

}
