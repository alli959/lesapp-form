

import { Component} from '@angular/core';
import { APIService }  from '../../app/api.service'

@Component({
  selector: 'app-root',
  templateUrl: './new-voice.component.html',
})
export class NewVoiceComponent {

  wordsplit:string[] = [];
  isWordGenerated = false;
  voices = ["Karl","Dora"];
  selectedVoice = "Karl";

  typeOfGame = ["sentences", "words", "letters"];
  selectedGame = "sentences";
  typeOfDifficulty = ["easy", "medium", "hard"];
  selectedDifficulty = "easy";
   
  constructor(private api: APIService){}

  playAudioBuffer(buffer:any){
    const context = new AudioContext();
    const source = context.createBufferSource();
    let uint8 = Uint8Array.from(buffer);
    context.decodeAudioData(uint8.buffer, function(buffer) {
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(0);
    });
    // source.buffer = uint8;
    // source.connect(context.destination);
    // source.start();
  }

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
      this.playAudioBuffer(result[0].data);
    });
  }

  buildVoice(input:string) {
    this.wordsplit = input.split(" ");
    this.isWordGenerated = true;
    let data = {
      textkey: input,
      voiceid: this.selectedVoice,
    }
    this.api.listen(data).subscribe((result:any) => {
      this.playAudioBuffer(result[0].data);
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

  shouldDisplayGeneratedText() {
    if (this.isWordGenerated) {
      return 'flex';
    }
    return 'none';
  }

}

