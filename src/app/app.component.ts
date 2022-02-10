import { Component } from '@angular/core';
import { APIService }  from './api.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {  
  voices = ["Karl","Dora"];
  selectedVoice = "Karl";
   
  constructor(private api: APIService){}
  playAudio(url:any){
    let audio = new Audio();
    audio.src = url;
    audio.load();
    audio.play();
  }
  speakNow(input:string){
    let data = {
      text: input,
      voice: this.selectedVoice,
      typeofgame: "sentences",
      typeofdifficulty: "hard"
    }
    this.api.speak(data).subscribe((result:any) => {
      this.playAudio(result[0].url);
    });
  }
}