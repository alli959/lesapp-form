import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar.component';
import awsExports from './aws-exports';
import { AmplifyService } from '../../services/amplify.service';
import Amplify from 'aws-amplify';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(
    private authService: AuthService,
    private service: AmplifyService
  ) {}

  ngOnInit(): void {
    Amplify.configure(awsExports);
    console.log('awsExports: ', awsExports);

    this.service.getUserData().then((data) => {});

    this.service.getUserScore().then((data) => {});

    this.service.getAllUserData().then((data) => {});

    this.service.getAllUserScore().then((data) => {});

    this.authService
      .fetchAllCognitoUsers()
      .then((users) => {
        console.log('Fetched users:', users);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });

    this.service.compareCognitoUsersToDataStoreUsers().then((data) => {
      console.log('data: ', data);
    });
  }
}
