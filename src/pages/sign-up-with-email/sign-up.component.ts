import { Component } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import {NavBarComponent} from '../../components/nav-bar.component';
import awsExports from './aws-exports';
import { AuthenticatorService } from '@aws-amplify/ui-angular';


@Component({
  selector: 'sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.css']
})
export class SignUpComponent {


  services = {
    async handleSignUp(formData: Record<string, any>) {
      let { username, password, attributes } = formData;
      // custom username
      username = attributes.email.toLowerCase();
      attributes.email = attributes.email.toLowerCase();
      return Auth.signUp({
        username,
        password,
        attributes,
      });
    },
  };
}