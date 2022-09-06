import {
  Component
} from '@angular/core';
import {
  APIService
} from '../../app/api.service'

// import {MatRadioModule} from '@angular/material/radio';


@Component({
  selector: 'app-root',
  templateUrl: './get-voice.component.html',
  styleUrls: ['get-voice.component.css'],
})
export class GetVoiceComponent {


  constructor(private api: APIService) {}

  shouldDisplayDifficulty() {
    if (!this.chosentypeofgame || this.chosentypeofgame === 'letters') {
      return 'none';
    }
    return 'flex';
  }

  shouldDisplayMainContent() {
    if (this.chosendifficulty || this.chosentypeofgame === 'letters') {
      return 'block';
    }
    return 'none';
  }


  playAudio(url: any) {
    let audio = new Audio();
    audio.src = url;
    audio.load();
    audio.play();
  }

  getTextDetails(url: any) {
    this.api.getText(url).subscribe((data) => {
      this.currentWord = data;
    })
  }




  currentWord: string = ''
  chosentypeofgame: string = ''
  typeofgame: string[] = ['letters', 'sentences', 'words'];
  chosendifficulty: string = '';
  typeofdifficulty: string[] = ['easy', 'medium', 'hard'];
  cardvalues: any[] = [];

  getData() {
    this.api.get({
      typeofgame: this.chosentypeofgame,
      typeofdifficulty: this.chosendifficulty
    }).subscribe((result: any) => {
      for (let key = 0; key < result.length; key++) {
        console.log("result", result);
        let temp = result[key];
        console.log("result[key", temp);
        console.log("temp.text", temp.Text);
        this.cardvalues.push(temp);
      }
    })
  }

}
