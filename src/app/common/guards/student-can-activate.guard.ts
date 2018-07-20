import { Injectable } from "@angular/core";
import { CanActivate, Router} from "@angular/router";
import { AuthenticationService } from "../authentication/authentication.service";

@Injectable()
export class StudentCanActivateGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}
 
  canActivate(){
    return this.authenticationService.users.map(u => !u.isAdmin);
  }
}