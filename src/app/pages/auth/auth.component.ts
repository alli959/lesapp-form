import { Component } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import { NavBarComponent } from '../../components/nav-bar.component';
import awsExports from './aws-exports';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.css'],
})
export class AuthComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private authenticatorService: AuthenticatorService
  ) {
    Amplify.configure(awsExports);
  }

  async handleSignUp(formData: Record<string, any>) {
    let { username, password, attributes } = formData;
    // custom username
    let email = attributes.email.toLowerCase();
    username = email;
    attributes.email = attributes.email.toLowerCase();
    try {
      let signUpResponse = await this.authService.signUp(
        username,
        password,
        email
      );
      this.router.navigate(['/']);
    } catch (error) {
      console.log('error signing up:', error);
      throw error;
    }
  }

  async handleSignIn(formData: Record<string, any>) {
    let { username, password } = formData;
    try {
      let signInResponse = await this.authService.signIn(username, password);
      console.log('signInResponse: ', signInResponse);
      this.router.navigate(['/']);
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  services = {
    handleSignUp: this.handleSignUp.bind(this),
    handleSignIn: this.handleSignIn.bind(this),
  };
}
