import { Injectable, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, from, of } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

import Amplify, { Auth } from 'aws-amplify';
import awsExports from '../aws-exports';

@NgModule()
@Injectable()
export class AuthService {

  public loggedIn: BehaviorSubject<boolean>;

  constructor(
    private router: Router
  ) {
    Amplify.configure(awsExports);
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }


  /** get authenticat state */
  public isAuthenticated(): Observable<boolean> {
    return from(Auth.currentAuthenticatedUser())
      .pipe(
        map(result => {
          this.loggedIn.next(true);
          return true;
        }),
        catchError(error => {
          this.loggedIn.next(false);
          return of(false);
        })
      );
  }


}
