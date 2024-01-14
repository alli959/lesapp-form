import { Injectable, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, from, of } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

import Amplify, { Auth } from 'aws-amplify';
import awsExports from '../../aws-exports';
import { get } from 'http';

@NgModule()
@Injectable()
export class AuthService {
  public user: BehaviorSubject<any>;
  public loggedIn: BehaviorSubject<boolean>;
  public email: BehaviorSubject<string>;
  public groups: BehaviorSubject<string[]>;

  constructor() {
    Amplify.configure(awsExports);
    this.loggedIn = new BehaviorSubject<boolean>(false);
    this.email = new BehaviorSubject<string>('');
    this.user = new BehaviorSubject<any>(null);
    this.groups = new BehaviorSubject<string[]>([]);
  }

  ngOnInit() {
    try {
      this.getUser().then((user) => {
        this.user.next(user);
        this.loggedIn.next(true);
        this.email.next(user.attributes.email);
        this.groups.next(
          user.signInUserSession.idToken.payload['cognito:groups']
        );
      });
    } catch (error) {
      console.log('error getting user', error);
      this.loggedIn.next(false);
      this.email.next('');
      this.groups.next([]);
    }
  }

  public async signUp(
    username: string,
    password: string,
    email: string
  ): Promise<void> {
    try {
      let signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log('signUpResponse: ', signUpResponse);
      let signInResponse = await Auth.signIn(username, password);
      this.loggedIn.next(true);
      this.email.next(signInResponse.attributes.email);
      this.user.next(signInResponse);
      this.groups.next(
        signInResponse.signInUserSession.idToken.payload['cognito:groups']
      );
      // this.user.next(signUpResponse);
      // this.email.next(email);
      // this.loggedIn.next(true);
      return signInResponse;
    } catch (error) {
      this.loggedIn.next(false);
      this.email.next('');
      this.user.next(null);
      console.log('error signing up:', error);
      throw error;
    }
  }

  public async signIn(username: string, password: string): Promise<any> {
    try {
      let signInResponse = await Auth.signIn(username, password);
      this.loggedIn.next(true);
      this.email.next(signInResponse.attributes.email);
      this.user.next(signInResponse);
      this.groups.next(
        signInResponse.signInUserSession.idToken.payload['cognito:groups']
      );
      return signInResponse;
    } catch (error) {
      console.log('error signing in', error);
      throw error;
    }
  }

  public async signOut(): Promise<void> {
    console.log('signing out');
    try {
      await Auth.signOut();
      this.user.next(null);
      this.email.next('');
      this.loggedIn.next(false);
    } catch (error) {
      console.log('error signing out', error);
      throw error;
    }
  }

  /** get authenticat state */
  public isAuthenticated(): Observable<boolean> {
    return from(this.getUser()).pipe(
      map((user) => !!user), // Convert the user to a boolean indicating logged in status
      catchError(() => of(false)) // On error, emit false
    );
  }

  public async checkIfUserIsAdmin() {
    try {
      const user = await this.getUser();
      const groups = user.signInUserSession.idToken.payload['cognito:groups'];

      if (groups && groups.includes('admin')) {
        console.log('User is in admin group');
        return true;
      } else {
        console.log('User is not in admin group');
        return false;
      }
    } catch (error) {
      console.error('Error fetching authenticated user', error);
      return false;
    }
  }

  public async getUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user;
    } catch (error) {
      console.error('Error fetching authenticated user', error);
      throw error;
    }
  }
}
