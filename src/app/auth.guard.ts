import { Injectable, NgModule } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from './auth.service';

@Injectable()
@NgModule()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>|boolean {
    const requiresLogin = next.data['requiresLogin'] || false;
    if (requiresLogin) {
      return this.auth.isAuthenticated()
        .pipe(
          tap(loggedIn => {
            if(!loggedIn) {
              
              this.router.navigate(['/admin'])
            }
          })
        );
    }
    return false;
  }
}