import { Injectable } from '@angular/core';
import { AuthenticationService, User } from '../shell/authentication/authentication.service';
import { Router} from '@angular/router';
import {  skip, first } from 'rxjs/operators';

@Injectable()
export class NavigationService {

  constructor(private authenticationService: AuthenticationService, 
    private router: Router) { }
  
  init(){
    var userChanges = this.authenticationService.users.pipe(skip(1));
    userChanges.subscribe(user => this.home(user));
  }

  home(user?: User){    
    if(user){      
      this.navigateToDefaultRoute(user);
    }
    else {
      this.authenticationService.getUser().then(u => this.navigateToDefaultRoute(u));
    }
  }

  private navigateToDefaultRoute(user: User){
    console.log("navigate to default", user);
    this.router.navigate([this.getDefaultRoute(user)]);
  }

  private getDefaultRoute(user: User): string {
    return user.isAdmin ? '/content' : "/words";
  }

}
