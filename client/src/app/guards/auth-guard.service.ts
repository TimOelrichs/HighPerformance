import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from "../models/role";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authService.isAuthenticated()) {
      const currentUser = this.authService.getUser();
      console.log(currentUser)
      if (currentUser) {
        // check if route is restricted by role
        if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
          // role not authorised so redirect to personal Records
          this.router.navigate(['/performance/2']);
          //this.router.navigate(['performancerecord/' + currentUser.userId]);
          return false;
        }
        if (currentUser.role === Role.User
          && this.router.url !== ""
            && this.router.url.split("/")[0] === "performace"
         ) {
          if (route.params.id !== currentUser.userID) {
            console.log()
            this.router.navigate(['/performance/2']);
            return false;
          }else{
            return true;
          }
        }

        // authorised so return true
        return true;
      }
    }else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
