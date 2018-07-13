import { Injectable } from '@angular/core';
import { AuthenticationService, User } from '../shell/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class NavigationService {

  constructor(private authenticationService: AuthenticationService, 
    private router: Router, private activatedRoute: ActivatedRoute) { }
  
  init(){
    combineLatest(
      this.authenticationService.user, 
      this.activatedRoute.url.pipe(filter(url => url.length == 1 && url[0].path == "")))
    .subscribe(([user, url]) => {
      this.home(user);
      console.log(url)
    }) ;
  }

  private home(user: User){
    if(user.isAdmin){
      this.router.navigate(['/content']);
    }
    else{
        this.router.navigate(['/words']);
    }
  }

}
