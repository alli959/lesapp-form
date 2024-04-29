import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar.component';
import awsExports from './aws-exports';
import { AmplifyService } from '../../services/amplify.service';
import Amplify from 'aws-amplify';
import { AuthService } from 'src/app/services/auth.service';
import { UserData, UserScore } from 'src/models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  navLinks = [
    { label: 'Notenda Stillingar', path: './settings' },
    { label: 'Stigin Mín', path: './my-score' },
    { label: 'Upptökunar Mínar', path: './my-recordings' },
    { label: 'Tölfræði Stiga', path: './statistics' },
  ];

  private _userData = new BehaviorSubject<UserData[]>([]);
  userData$ = this._userData.asObservable();

  private _userScore = new BehaviorSubject<UserScore[]>([]);
  userScore$ = this._userScore.asObservable();

  private _allUserData = new BehaviorSubject<UserData[]>([]);
  allUserData$ = this._allUserData.asObservable();

  private _allUserScore = new BehaviorSubject<UserScore[]>([]);
  allUserScore$ = this._allUserScore.asObservable();

  constructor(
    private authService: AuthService,
    private service: AmplifyService
  ) {}

  ngOnInit(): void {
    Amplify.configure(awsExports);
    console.log('awsExports: ', awsExports);

    this.fetchUserData()
      .then((data) => {
        console.log('fetchUserData data ', data);
        this.userData = data;
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
    this.fetchUserScore()
      .then((data) => {
        console.log('fetchUserScore data ', data);
        this._userScore.next(data);
      })
      .catch((error) => {
        console.error('Error fetching user score:', error);
      });

    this.fetchAllUserData()
      .then((data) => {
        console.log('fetchAllUserData data ', data);
        this._allUserData.next(data);
      })
      .catch((error) => {
        console.error('Error fetching all user data:', error);
      });

    this.fetchAllUserScore()
      .then((data) => {
        console.log('fetchAllUserScore data ', data);
        this._allUserScore.next(data);
      })
      .catch((error) => {
        console.error('Error fetching all user score:', error);
      });

    this.authService
      .fetchAllCognitoUsers()
      .then((users) => {
        console.log('Fetched users:', users);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });

    // this.service.compareCognitoUsersToDataStoreUsers().then((data) => {
    //   console.log('data: ', data);
    // });
  }

  async fetchUserData() {
    let userData = await this.service.getUserData();
    console.log('userData: ', userData);
    return userData;
  }

  async fetchUserScore() {
    let userScore = await this.service.getUserScore();
    console.log('userScore: ', userScore);
    return userScore;
  }

  async fetchAllUserData() {
    let allUserData = await this.service.getAllUserData();
    console.log('allUserData: ', allUserData);
    return allUserData;
  }

  async fetchAllUserScore() {
    let allUserScore = await this.service.getAllUserScore();
    console.log('allUserScore: ', allUserScore);
    return allUserScore;
  }

  async fetchAllCognitoUsers() {
    let allCognitoUsers = await this.authService.fetchAllCognitoUsers();
    console.log('allCognitoUsers: ', allCognitoUsers);
    return allCognitoUsers;
  }

  get userData(): UserData[] {
    return this._userData.value;
  }
  set userData(value: UserData[]) {
    this._userData.next(value);
  }
  get userScore(): UserScore[] {
    return this._userScore.value;
  }
  set userScore(value: UserScore[]) {
    this._userScore.next(value);
  }
  get allUserData(): UserData[] {
    return this._allUserData.value;
  }
  get allUserScore(): UserScore[] {
    return this._allUserScore.value;
  }

  async updateUserData(userDataId: string, usrData: any) {
    let updateUserData = await this.service.updateUserData(userDataId, usrData);
    console.log('updateUserData: ', updateUserData);
    return updateUserData;
  }

  async compareCognitoUsersToDataStoreUsers() {
    let compareCognitoUsersToDataStoreUsers =
      await this.service.compareCognitoUsersToDataStoreUsers();
    console.log(
      'compareCognitoUsersToDataStoreUsers: ',
      compareCognitoUsersToDataStoreUsers
    );
    return compareCognitoUsersToDataStoreUsers;
  }

  async checkIfUserIsAdmin() {
    let checkIfUserIsAdmin = await this.authService.checkIfUserIsAdmin();
    console.log('checkIfUserIsAdmin: ', checkIfUserIsAdmin);
    return checkIfUserIsAdmin;
  }
}
