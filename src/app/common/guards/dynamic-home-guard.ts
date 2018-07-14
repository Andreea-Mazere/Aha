import { Injectable } from "@angular/core";
import { CanActivate} from "@angular/router";
import { NavigationService } from "../../navigation/navigation.service";

@Injectable()
export class DynamicHomeGuard implements CanActivate {
  constructor(private navigationService: NavigationService) {}
 
  canActivate(){
    console.log('dynamic home guard - can activate');
    this.navigationService.home();
    return false;
  }
}