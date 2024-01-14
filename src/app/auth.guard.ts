import { Injectable, NgModule } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
@NgModule()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/auth']);
    }
    const requiresLogin = next.data['requiresLogin'] || false;
    if (requiresLogin) {
      return this.auth.isAuthenticated().pipe(
        tap((loggedIn) => {
          if (!loggedIn) {
            this.router.navigate(['/auth']);
          }
        })
      );
    }
    return true;
  }
}
