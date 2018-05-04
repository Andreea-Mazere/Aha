import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {
  logInWithEmailAndPassword(email: string, password: string): any {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  logOut(): any {
    this.afAuth.auth.signOut();
  }
  private fiebaseUser: Observable<firebase.User>;
  user: Observable<User>;

  getUserData(u: firebase.User): Promise<User> {
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
      console.log('user: ', user);
      return user;
    });
  }
  constructor(
    private afAuth: AngularFireAuth) {
    this.fiebaseUser = afAuth.authState;
    this.user = this.fiebaseUser.switchMap(this.getUserData).share();
  }

}

export class User {
  isAuthenticated: boolean;
  name: string;
  isAdmin: boolean;
}
