import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../common/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  passwordChangeForm: FormGroup;
  showPasswordChanged: boolean;
  get newPasswordConfirm() { return this.passwordChangeForm.get('newPasswordConfirm'); }

  constructor(
    formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.passwordChangeForm = formBuilder.group({
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      newPasswordConfirm: [""]
    }, {
        validator: [childValuesMustMatch('newPassword', 'newPasswordConfirm')]
      });
  }

  changePassword() {
    this.authenticationService.changePassword(this.passwordChangeForm.value.oldPassword, this.passwordChangeForm.value.newPassword)
    .then(() => this.showPasswordChanged = true)
    .catch(e => {
      console.log('error changing password', e);
      let control = this.getFormControlByErrorCode(e.code);
      let errors = control.errors || {};
      let newError = {};
      newError[e.code] = true;
      Object.assign(errors, newError);
      control.setErrors(errors);
    });
  }
  
  onPasswordChangeAcknowledged() {
    this.showPasswordChanged = false;
  }

  private getFormControlByErrorCode(code): AbstractControl {
    switch (code) {
      case 'auth/wrong-password':
        return this.passwordChangeForm.get('oldPassword');
      case 'auth/weak-password':
        return this.passwordChangeForm.get('newPassword');
      default: 
        return this.passwordChangeForm;
    }
  }

  ngOnInit() {
  }

}

function childValuesMustMatch(referenceChildName: string, testedChildName: string): ValidatorFn {
  return (control: AbstractControl): any => {
    let referenceValue = control.get(referenceChildName).value;
    let testedControl = control.get(testedChildName);
    let testedValue = testedControl.value;
    if (testedValue !== referenceValue)
      testedControl.setErrors({ 'mustMatch': true });
    else {
      if (testedControl.errors) {
        delete testedControl.errors.mustMatch;
        testedControl.updateValueAndValidity();
      }
    }
  };
}