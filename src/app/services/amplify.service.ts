import { Injectable } from '@angular/core';
import Amplify, { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { schema } from '../../models/schema';
import { AuthService } from './auth.service';

import { UserData, UserScore } from '../../models';
@Injectable({
  providedIn: 'root',
})
export class AmplifyService {
  constructor(private authService: AuthService) {}

  private lesaCollection = Amplify.DataStore;

  async getUserData() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log('user is => ', user);
      const userId = user.attributes.sub; // or the appropriate identifier
      if (!userId) {
        throw new Error('User ID is undefined or null.');
      }
      const userData = await this.lesaCollection.query(UserData, (where: any) =>
        where.id('eq', userId)
      );
      console.log('userData is => ', userData);
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  async getUserScore() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log('user is => ', user);
      const userId = user.attributes.sub; // or the appropriate identifier
      if (!userId) {
        throw new Error('User ID is undefined or null.');
      }
      const userScores = await this.lesaCollection.query(
        UserScore,
        (where: any) => where.userdataID('eq', userId)
      );
      console.log('userScores is => ', userScores);
      return userScores;
    } catch (error) {
      console.error('Error fetching user scores:', error);
      throw error;
    }
  }

  async getAllUserData() {
    const user = await Auth.currentAuthenticatedUser();
    // order by username
    const userData = await this.lesaCollection.query(UserData);
    console.log('All userData is => ', userData);
    return userData;
  }

  async getAllUserScore() {
    const user = await Auth.currentAuthenticatedUser();
    const userScores = await this.lesaCollection.query(UserScore);
    console.log('All userScores is => ', userScores);
    return userScores;
  }

  async compareCognitoUsersToDataStoreUsers() {
    const cognitoUsers = await this.authService.fetchAllCognitoUsers();
    const dataStoreUsers = await this.getAllUserData();
    const cognitoUserIds = cognitoUsers.map((user: any) => user.Username);
    const dataStoreUserIds = dataStoreUsers.map((user: any) => user.id);
    const cognitoUserIdsSet = new Set(cognitoUserIds);
    const dataStoreUserIdsSet = new Set(dataStoreUserIds);
    const cognitoUsersNotInDataStore = cognitoUsers.filter(
      (user: any) => !dataStoreUserIdsSet.has(user.Username)
    );

    // order by date_updated
    const dataStoreUsersNotInCognito = dataStoreUsers.filter(
      (user: any) => !cognitoUserIdsSet.has(user.id)
    );

    const sortedDataStoreUsersNotInCognito = dataStoreUsersNotInCognito.sort(
      (a: any, b: any) => {
        // Convert updatedAt to Date objects for comparison
        const dateA: any = new Date(a.updatedAt);
        const dateB: any = new Date(b.updatedAt);

        // Compare the two dates
        return dateB - dateA; // Use `dateA - dateB` for ascending order
      }
    );

    const sortedCognitoUsersNotInDataStore = cognitoUsersNotInDataStore.sort(
      (a: any, b: any) => {
        // Convert updatedAt to Date objects for comparison
        const dateA: any = new Date(a.UserCreateDate);
        const dateB: any = new Date(b.UserCreateDate);

        // Compare the two dates
        return dateB - dateA; // Use `dateA - dateB` for ascending order
      }
    );
    console.log('cognitoUsersNotInDataStore: ', cognitoUsersNotInDataStore);
    console.log('dataStoreUsersNotInCognito: ', dataStoreUsersNotInCognito);
    console.log(
      'sortedCognitoUsersNotInDataStore',
      sortedCognitoUsersNotInDataStore
    );
    console.log(
      'sortedDataStoreUsersNotInCognito',
      sortedDataStoreUsersNotInCognito
    );

    // console.log emails of users not in cognito
  }
}
