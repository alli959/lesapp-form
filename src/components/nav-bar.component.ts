import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'application-nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent implements OnInit {

  email:string = "";

  constructor(){}

  ngOnInit() {
    this.email = "";

    Auth.currentAuthenticatedUser()
      .then(user => {
        this.email = user.attributes.email;
      })
      .catch(() => console.log("Not signed in"));
  }

  onLogoutClick() {

    console.log("Logout Clicked");

    Auth.signOut({ global: true })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

}