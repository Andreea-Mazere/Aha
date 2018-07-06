import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from'; 

@Injectable() 
export class TranslateLoaderService implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    var commonMessages = {
      networkRequestFailed: "Couldn't get a response from the server."
    };
    return Observable.from([{
      passwordChangeForm_oldPassword_required: "You must confirm your identity before changing your password",
      passwordChangeForm_newPassword_required: "You must choose a new password",
      passwordChangeForm_newPasswordConfirm_mustMatch: "Make sure you spelled the new password twice correctly",
      'passwordChangeForm_oldPassword_auth/wrong-password': "The old password is invalid.",
      'passwordChangeForm_auth/network-request-failed': commonMessages.networkRequestFailed,
      loginForm_email_required : 'Your email address is required.',
      loginForm_password_required : 'Your password is required.',
      'loginForm_email_auth/invalid-email': "We couldn't find a user with this email.\n Is there a typo? \n Or have you registered with a different email?",
      'loginForm_password_auth/wrong-password': "The password is incorrect.",
      'loginForm_auth/network-request-failed': "Network failure."
    }]);
  }
} 

export function createTranslateLoader(): TranslateLoaderService {
  return new TranslateLoaderService();
  } 