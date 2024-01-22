import { Injectable, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, from, of } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

import Amplify, { Auth } from 'aws-amplify';
import awsExports from '../../aws-exports';
import { get } from 'http';
import * as AWS from 'aws-sdk/global';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

@Injectable({
  providedIn: 'root', // This makes AuthService a singleton
})
@NgModule()
export class AuthService {
  public cognito = new CognitoIdentityServiceProvider();
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
    this.initializeUserState();
    this.initializeCognitoClient();
  }

  private async initializeCognitoClient() {
    try {
      const credentials = await Auth.currentCredentials();
      AWS.config.update({
        region: awsExports['aws_appsync_region'],
        credentials: Auth.essentialCredentials(credentials),
      });
      this.cognito = new CognitoIdentityServiceProvider();
    } catch (error) {
      console.error('Error initializing Cognito client:', error);
    }
  }

  private async initializeUserState() {
    try {
      const user = await this.getUser();
      this.user.next(user);
      console.log('userid: ', user.attributes.sub);
      this.loggedIn.next(true);
      this.email.next(user.attributes.email);
      this.groups.next(
        user.signInUserSession.idToken.payload['cognito:groups']
      );
    } catch (error) {
      console.log('error getting user', error);
      this.clearUserState();
    }
  }

  private async clearUserState() {
    this.loggedIn.next(false);
    this.email.next('');
    this.groups.next([]);
  }

  private updateUserState(user: any) {
    this.user.next(user);
    this.loggedIn.next(true);
    this.email.next(user.attributes.email);
    this.groups.next(user.signInUserSession.idToken.payload['cognito:groups']);
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
      this.updateUserState(signInResponse);
      return signInResponse;
    } catch (error) {
      this.clearUserState();
      console.log('error signing up:', error);
      throw error;
    }
  }

  public async signIn(username: string, password: string): Promise<any> {
    try {
      let signInResponse = await Auth.signIn(username, password);
      this.updateUserState(signInResponse);
      return signInResponse;
    } catch (error) {
      console.log('error signing in', error);
      this.clearUserState();
      throw error;
    }
  }

  public async signOut(): Promise<void> {
    console.log('signing out');
    try {
      await Auth.signOut();
      this.clearUserState();
    } catch (error) {
      console.log('error signing out', error);
      this.clearUserState();
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

      if (groups && groups.includes('admins')) {
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

  public async getUser(): Promise<any> {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user;
    } catch (error) {
      console.error('Error fetching authenticated user', error);
      throw error;
    }
  }

  public async fetchAllCognitoUsers(): Promise<any> {
    let is_admin = await this.checkIfUserIsAdmin();
    console.log('is_admin: ', is_admin);
    await this.initializeCognitoClient(); // Make sure client is initialized
    const allUsers = [];
    let paginationToken = null;

    do {
      const params: any = {
        UserPoolId: awsExports['aws_user_pools_id'],
        PaginationToken: paginationToken,
      };

      try {
        const response = await this.cognito.listUsers(params).promise();
        if (response.Users) {
          allUsers.push(...response.Users);
        }
        paginationToken = response.PaginationToken;
      } catch (error) {
        console.error('An error occurred while fetching users:', error);
        break;
      }
    } while (paginationToken);

    return allUsers;
  }
}
