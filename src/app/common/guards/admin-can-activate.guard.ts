import { Injectable } from "@angular/core";
import { CanActivate, Router} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthenticationService } from "../../shell/authentication/authentication.service";

@Injectable()
export class AdminCanActivateGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService) {}
 
  canActivate(){
    return this.authenticationService.user.map(u => u.isAdmin );
  }
}