import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'application-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  email: string = '';
  loggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.email = this.authService.email.value;
    this.loggedIn = this.authService.loggedIn.value;
    console.log('NavBarComponent.ngOnInit()');
    console.log('this.email =', this.email);
    console.log('this.loggedIn =', this.loggedIn);
  }

  async onLogoutClick() {
    console.log('Logout Clicked');
    await this.authService.signOut();
    this.router.navigate(['/auth']);
  }
}
