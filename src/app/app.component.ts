import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'angular';

  constructor() {
    if (typeof window !== 'undefined') {
      (window as any)['Amplify'] = Amplify;
    }
  }
}