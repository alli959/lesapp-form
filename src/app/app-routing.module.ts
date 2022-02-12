import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewVoiceComponent} from 'src/pages/newVoice/new-voice.component'
import { SignUpComponent } from 'src/pages/sign-up-with-email/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent
  },
  
  {
    path: 'add',
    component: NewVoiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}