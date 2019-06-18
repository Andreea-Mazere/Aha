import { Injectable } from "@angular/core";
import { CanActivate} from "@angular/router";
import { AuthenticationService } from "../../authentication/authentication.service";

@Injectable()
export class AdminCanActivateGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService) {}
 
  canActivate(){
    return this.authenticationService.users.map(u => u.isAdmin );
  }
}