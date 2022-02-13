import { Component } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import awsExports from './aws-exports';
import { AuthenticatorService } from '@aws-amplify/ui-angular';


@Component({
  selector: 'sign-up',
  templateUrl: 'sign-up.component.html',
})
export class SignUpComponent {
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }

  
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