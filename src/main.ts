import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Amplify, { Auth,API } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
Auth.configure(awsconfig);
API.configure(awsconfig);


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
