import { Injectable, NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterModule,
  Routes,
  RouterLink,
} from '@angular/router';
import { NewVoiceComponent } from 'src/app/pages/newVoice/new-voice.component';
import { GetVoiceComponent } from 'src/app/pages/getVoice/get-voice.component';
import { AuthenticatorService, SignInComponent } from '@aws-amplify/ui-angular';
import { Observable } from 'rxjs';
import { Amplify, Auth } from 'aws-amplify';
import { AuthGuard } from './auth.guard';
import { SvgIconComponent } from 'src/app/components/svg-icon.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { AuthComponent } from './pages/auth/auth.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { MyScoreComponent } from './components/my-score/my-score.component';
import { MyRecordingsComponent } from './components/my-recordings/my-recordings.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { requiresLogin: true },
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { requiresLogin: true, requiresAdmin: true },
    children: [
      { path: 'settings', component: UserSettingsComponent },
      { path: 'my-score', component: MyScoreComponent },
      { path: 'my-recordings', component: MyRecordingsComponent },
      { path: 'statistics', component: StatisticsComponent },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthGuard],
    data: { requiresLogin: false },
  },
  {
    path: 'voice/create',
    component: NewVoiceComponent,
    canActivate: [AuthGuard],
    data: { requiresLogin: true },
  },
  {
    path: 'voice/get',
    component: GetVoiceComponent,
    canActivate: [AuthGuard],
    data: { requiresLogin: true },
  },
  {
    path: 'assets/svg/:name',
    component: SvgIconComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
