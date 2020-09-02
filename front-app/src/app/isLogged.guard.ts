import {Injectable} from "@angular/core";
import {Router ,CanActivate} from "@angular/router";
import {AdduserService} from "./adduser.service";

@Injectable()
export class IsLoggedIn implements CanActivate{
  constructor(private userService : AdduserService,
              private router :Router) {
  }
  canActivate(){
    if(this.userService.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['login'])
      return false;
    }
  }

}
