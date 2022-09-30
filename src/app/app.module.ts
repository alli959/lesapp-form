import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LegacyAmplifyUiModule } from '@aws-amplify/ui-angular/legacy';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RoutingModule  } from 'angular-routing';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import {NewVoiceComponent, NewVoiceModal, SaveVoiceModal, LetterSound, SilentSound} from 'src/pages/newVoice/new-voice.component'
import {GetVoiceComponent, UpdateLetterSound, UpdateSaveVoiceModal, UpdateSilentSound, UpdateVoiceModal} from 'src/pages/getVoice/get-voice.component'
import {SignUpComponent} from 'src/pages/sign-up-with-email/sign-up.component'
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {NavBarComponent} from '../components/nav-bar.component';
import {DialogComponent} from '../components/dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {SnackBarComponent} from '../components/snackbar.component';

import {MaterialExampleModule} from '../material.module';
import { SvgIconComponent } from 'src/components/svg-icon.component';






@NgModule({
  declarations: [
    AppComponent,
    NewVoiceComponent,
    SignUpComponent,
    GetVoiceComponent,
    NavBarComponent,
    NewVoiceModal,
    SvgIconComponent,
    SaveVoiceModal,
    DialogComponent,
    SnackBarComponent,
    LetterSound,
    SilentSound,
    UpdateVoiceModal,
    UpdateLetterSound,
    UpdateSaveVoiceModal,
    UpdateSilentSound
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RoutingModule,
    AmplifyAuthenticatorModule,
    HttpClientModule,
    LegacyAmplifyUiModule,
    MdbRippleModule,
    AuthGuard,
    AuthService,
    BrowserAnimationsModule,
    MatRadioModule,
    MatCardModule,
    MaterialExampleModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }