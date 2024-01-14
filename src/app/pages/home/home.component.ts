import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar.component';
import awsExports from './aws-exports';
import Amplify from 'aws-amplify';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  ngOnInit(): void {
    Amplify.configure(awsExports);
  }
}
