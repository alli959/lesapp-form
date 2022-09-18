import {
  Component,
  Inject
} from '@angular/core';
import {
  APIService
} from '../../app/api.service'
import {
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
  MatIconRegistry
} from '@angular/material/icon';
import {
  DomSanitizer
} from '@angular/platform-browser';



export interface DialogData {
  wordsplit: [];
}

@Component({
  selector: 'app-root',
  templateUrl: './new-voice.component.html',
  styleUrls: ['./new-voice.component.css']

})
export class NewVoiceComponent {

  wordsplit: string[] = [];
  isWordGenerated = false;
  voices = ["Karl", "Dora"];
  selectedVoice = "Karl";

  typeOfGame = ["sentences", "words", "letters"];
  selectedGame = "sentences";
  typeOfDifficulty = ["easy", "medium", "hard"];
  selectedDifficulty = "easy";

  constructor(private api: APIService, public dialog: MatDialog) {}



  playAudioBuffer(buffer: any) {
    const context = new AudioContext();
    const source = context.createBufferSource();
    let uint8 = Uint8Array.from(buffer);
    context.decodeAudioData(uint8.buffer, function (buffer) {
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(0);
    });
    // source.buffer = uint8;
    // source.connect(context.destination);
    // source.start();
  }

  playAudio(url: any) {
    let audio = new Audio();
    audio.src = url;
    audio.load();
    audio.play();
  }
  listenNow(input: string) {
    let data = {
      textkey: input,
      voiceid: this.selectedVoice,
    }
    this.api.listen(data).subscribe((result: any) => {
      this.playAudioBuffer(result[0].data);
    });
  }

  buildVoice(input: string) {
    this.wordsplit = input.split(" ");
    this.isWordGenerated = true;
    let data = {
      textkey: input,
      voiceid: this.selectedVoice,
    }
    this.api.listen(data).subscribe((result: any) => {
      this.playAudioBuffer(result[0].data);
    });
    const dialogRef = this.dialog.open(NewVoiceModal, {
      data: {
        wordsplit: this.wordsplit
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });


  }
  speakNow(input: string) {
    let data = {
      text: input,
      voice: this.selectedVoice,
      typeofgame: this.selectedGame,
      typeofdifficulty: this.selectedDifficulty
    }
    this.api.speak(data).subscribe((result: any) => {
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

@Component({
  selector: 'voice-modal-content',
  templateUrl: './new-voice-modal.html',
  styleUrls: ['./new-voice-component.css']


})
export class NewVoiceModal {

  typeindex: number[] = [];
  typesArr: string[][] = [];
  wordsplit: string[] = [];
  selectedType: boolean[][] = [];


  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private api: APIService) {
    iconRegistry.addSvgIcon(
      'ear',
      sanitizer.bypassSecurityTrustResourceUrl('assets/ear.svg'));

    this.wordsplit = data.wordsplit;


    for (const element of this.wordsplit) {

      if (element.includes('ll')) {
        let beforeString = element.substring(0, element.indexOf('ll'));
        let middleOne = '<phoneme alphabet="ipa" ph="l:">ll</phoneme>';
        let middleTwo = '<phoneme alphabet="ipa" ph="ll">ll</phoneme>';
        let middleThree = 't<phoneme alphabet="ipa" ph="l">ll</phoneme>';
        let middleFour = '<phoneme alphabet="ipa" ph="tl">ll</phoneme>';
        let afterString = element.substring(element.indexOf('ll') + 2, element.length);

        let newStringArr = [
          element,
          beforeString +
          middleOne +
          afterString,
          beforeString +
          middleTwo +
          afterString,
          beforeString +
          middleThree +
          afterString,
          beforeString +
          middleFour +
          afterString
        ];
        this.typesArr.push(newStringArr);
        this.selectedType.push([true, false, false, false, false]);
      } else {
        this.typesArr.push([element]);
        this.selectedType.push([true]);
      }
      this.typeindex.push(0);

    }
  }




  playAudioBuffer(buffer: any) {
    const context = new AudioContext();
    const source = context.createBufferSource();
    let uint8 = Uint8Array.from(buffer);
    context.decodeAudioData(uint8.buffer, function (buffer) {
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(0);
    });
    console.log("typesArr is",this.typesArr)
  }
  listenKarl(input: string[],index: number) {


    let data = {
      textkey: input[this.typeindex[index]],
      voiceid: 'Karl'
    }
    this.api.listen(data).subscribe((result: any) => {
      this.playAudioBuffer(result[0].data);
    });
  }
  listenDora(input: string[], index: number) {

    let data = {
      textkey: input[this.typeindex[index]],
      voiceid: 'Dora'
    }
    this.api.listen(data).subscribe((result: any) => {
      this.playAudioBuffer(result[0].data);
    });
  }

  changeToggle(wordIndex:number,newToggleIndex:number) {
    console.log("we are at the correct position");
    console.log("wordIndex is",wordIndex);
    console.log("newToggleIndex is",newToggleIndex);
    this.typeindex[wordIndex] = newToggleIndex;
  }

  isToggle(wordIndex:number,newToggleIndex:number) {
    if (this.typeindex[wordIndex] === newToggleIndex) {
      return true;
    }
    return false;
  }

  // listen to the sentence Karl after build
  listenToSentenceKarlAfterBuild() {
    let sentence = "";
    for (let i = 0; i < this.wordsplit.length; i++) {
      sentence = sentence + this.typesArr[i][this.typeindex[i]] + " ";
    }
    let data = {
      textkey: sentence,
      voiceid: "Karl",
    }
    this.api.listen(data).subscribe((result: any) => {
      this.playAudioBuffer(result[0].data);
    });
  }
  // listen to the sentence Dora after build
  listenToSentenceDoraAfterBuild() {
    let sentence = "";
    for (let i = 0; i < this.wordsplit.length; i++) {
      sentence = sentence + this.typesArr[i][this.typeindex[i]] + " ";
    }
    let data = {
      textkey: sentence,
      voiceid: "Dora",
    }
    this.api.listen(data).subscribe((result: any) => {
      this.playAudioBuffer(result[0].data);
    });
  }

}
