

import { Component} from '@angular/core';
import { APIService }  from '../../app/api.service'

@Component({
  selector: 'app-root',
  templateUrl: './new-voice.component.html',
})
export class NewVoiceComponent {



  voices = ["Karl","Dora"];
  selectedVoice = "Karl";

  typeOfGame = ["sentences", "words", "letters"];
  selectedGame = "sentences";
  typeOfDifficulty = ["easy", "medium", "hard"];
  selectedDifficulty = "easy";
   
  constructor(private api: APIService){}



  playAudio(url:any){
    let audio = new Audio();
    audio.src = url;
    audio.load();
    audio.play();
  }
  listenNow(input:string) {
    let data = {
      textkey: input,
      voiceid: this.selectedVoice,
    }
    this.api.listen(data).subscribe((result:any) => {
      this.playAudio(result[0]);
    });
  }
  speakNow(input:string){
    let data = {
      text: input,
      voice: this.selectedVoice,
      typeofgame: this.selectedGame,
      typeofdifficulty: this.selectedDifficulty
    }
    this.api.speak(data).subscribe((result:any) => {
      this.playAudio(result[0].url);
    });
  }

}

