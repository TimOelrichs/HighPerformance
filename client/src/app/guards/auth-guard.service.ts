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
      if (currentUser) {
        // check if route is restricted by role
        if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
          // role not authorised so redirect to personal Records
          if (currentUser.role === Role.HR) {
               this.router.navigate([""]);
               return false;
             }
          this.router.navigateByUrl(`/performance/${currentUser.userId}`);
          //this.router.navigate(['performancerecord/' + currentUser.userId]);
          return false;
          }
          if (currentUser.role === Role.User
          ) {
            if (route.params.id && route.params.id != currentUser.userId) {
              this.router.navigateByUrl(`/performance/${currentUser.userId}`);
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
