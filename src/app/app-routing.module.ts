import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterModule, Routes, RouterLink } from '@angular/router';
import {NewVoiceComponent} from 'src/pages/newVoice/new-voice.component'
import { SignUpComponent } from 'src/pages/sign-up-with-email/sign-up.component';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Observable } from 'rxjs';
import { Amplify, Auth } from 'aws-amplify';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: SignUpComponent
  },
  
  {
    path: 'admin/add',
    component: NewVoiceComponent,
    data: {requiresLogin: true},
    canActivate: [ AuthGuard ]
  },
  {
    path: 'notauthorized',
    redirectTo: 'admin',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}