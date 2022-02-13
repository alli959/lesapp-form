import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LegacyAmplifyUiModule } from '@aws-amplify/ui-angular/legacy';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RoutingModule  } from 'angular-routing';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import {NewVoiceComponent} from 'src/pages/newVoice/new-voice.component'
import {SignUpComponent} from 'src/pages/sign-up-with-email/sign-up.component'
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';



@NgModule({
  declarations: [
    AppComponent,
    NewVoiceComponent,
    SignUpComponent
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
    AuthService
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }