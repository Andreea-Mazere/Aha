import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { first } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  changePassword(oldPassword: string, newPassword: string): Promise<any> {
    if (this.firebaseUserValue == null) return Promise.reject({code:'MustBeLoggedOnForThisOperation'});
    var credential = firebase.auth.EmailAuthProvider.credential(this.firebaseUserValue.email, oldPassword);
    return this.firebaseUserValue.reauthenticateWithCredential(credential)
      .then(() =>  this.firebaseUserValue.updatePassword(newPassword));
  }
  logInWithEmailAndPassword(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  logOut(): Promise<any> {
    return this.afAuth.auth.signOut();
  }
  private firebaseUser: Observable<firebase.User>;
  firebaseUserValue: firebase.User;
  users: Observable<User>;
  getUser(): Promise<User>{
    return this.users.pipe(first()).toPromise();
  }

  private getUserData(u: firebase.User): Promise<User> {
    if (u == null)
      return new Promise<User>((resolve, reject) => {
        var guest = new User();
        guest.name = '<guest>';
        console.log('guest user: ', guest);
        resolve(guest)
      });
      
    return u.getIdToken().then(id => {
      let user = new User();
      let claims = JSON.parse(atob(id.split('.')[1]));
      user.isAdmin = claims.admin;
      user.name = claims.name;
      user.isAuthenticated = true;
      user.token = id;
      console.log('user: ', user);
      return user;
    });
  }
  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.firebaseUser = afAuth.authState;
    this.firebaseUser.subscribe(u => this.firebaseUserValue = u);
    this.users = this.firebaseUser.switchMap(this.getUserData).publishReplay(1).refCount();
  }

}

export class User {
  isAuthenticated: boolean;
  name: string;
  isAdmin: boolean;
  token: string;
}
