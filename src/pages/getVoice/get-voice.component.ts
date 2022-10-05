import {
  Component,
  Inject
} from '@angular/core';
import {
  APIService
} from '../../app/api.service'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
  DialogComponent
} from 'src/components/dialog.component';
import {
  SnackBarComponent
} from 'src/components/snackbar.component';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  MatIconRegistry
} from '@angular/material/icon';
import {
  DomSanitizer
} from '@angular/platform-browser';

// import {MatRadioModule} from '@angular/material/radio';

// Using Icelandic sampa dictionary, replace word with sampa
export function sampa(word: string) {
  const sampaDict: any = {
    "a": "a",
    "á": "au",
    "b": "b",
    "d": "d",
    "ð": "D",
    "e": "E",
    "é": "e:",
    "f": "f",
    "g": "G",
    "h": "C",
    "i": "I",
    "í": "i:",
    "j": "j",
    "k": "k_h",
    "l": "l",
    "m": "m",
    "n": "n",
    "o": "O",
    "ó": "Ou",
    "p": "p_h",
    "r": "r",
    "s": "s",
    "t": "d",
    "u": "Y",
    "ú": "u:",
    "v": "v",
    "x": "x",
    "y": "I",
    "ý": "i",
    "þ": "T",
    "æ": "aE",
    "ö": "9",
    "A": "a",
    "Á": "au",
    "B": "b",
    "D": "d",
    "Ð": "D",
    "E": "E",
    "É": "e:",
    "F": "f",
    "G": "g",
    "H": "C",
    "I": "I",
    "Í": "i:",
    "J": "j",
    "K": "k_h",
    "L": "l",
    "M": "m",
    "N": "n",
    "O": "O",
    "Ó": "Ou",
    "P": "p_h",
    "R": "r",
    "S": "s",
    "T": "d",
    "U": "Y",
    "Ú": "u:",
    "V": "v",
    "X": "x",
    "Y": "I",
    "Ý": "i",
    "Þ": "T",
    "Æ": "aE",
    "Ö": "9",
    ":": ":"
  };
  let sampaWord = "";
  for (let i = 0; i < word.length; i++) {
    let w = word[i];
    let s = sampaDict[w];
    sampaWord += s;
  }
  console.log("sampa word is =>", sampaWord);
  return `<phoneme alphabet="x-sampa" ph="${sampaWord}">${word}</phoneme>`;
}



export interface DialogData {
  wordsplit: [];
  text: "";
  identity: "";
  typeofgame: "";
  typeofdifficulty: "";
  karl: "";
  dora: "";
}
export interface FinalDialogData {
  textkey: "";
  text: "";
  identity: "";
  eSelectedGame: "";
  eSelectedDifficulty: "";
  karl: "";
  dora: "";
}
@Component({
  selector: 'app-root',
  templateUrl: './get-voice.component.html',
  styleUrls: ['get-voice.component.css'],
})
export class GetVoiceComponent {
  currentWord: string = ''
  chosentypeofgame: string = 'letters';
  typeofgame: string[] = ['letters', 'sentences', 'words'];
  chosendifficulty: string = 'easy';
  typeofdifficulty: string[] = ['easy', 'medium'];
  cardvalues: any[] = [];

  constructor(private api: APIService, public dialog: MatDialog, private _snackBar: MatSnackBar) {}


  openSnackBar(message: string) {

    this._snackBar.open(message, undefined, {
      duration: 3000,
    });
  }
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






  async getData() {
    this.cardvalues = [];
    (await this.api.get({
      typeofgame: this.chosentypeofgame,
      typeofdifficulty: this.chosendifficulty,
      istextkey: true
    })).subscribe((result: any) => {
      for (let key = 0; key < result.length; key++) {
        console.log("result", result);
        let temp = result[key];
        console.log("result[key", temp);
        console.log("temp.text", temp.Text);
        this.cardvalues.push(temp);
      }
    })
  }

  deleteData(id: any, index: any) {
    let dialog = this.dialog.open(DialogComponent, {
      width: '250px'
    });
    dialog.afterClosed().subscribe(result => {
      if (result === "yes") {
        console.log("id is =>", id);
        this.api.delete({
          id: id,
          typeofgame: this.chosentypeofgame,
          typeofdifficulty: this.chosendifficulty

        }).subscribe((result: any) => {
          this.openSnackBar("Tókst að eyða");
          this.cardvalues.splice(index, 1);
        }, (error: any) => {
          this.openSnackBar("Ekki tókst að eyða með skilaboðum => "+error.message);
        });
      }
    });



  }

  updateData(id: any, index: any) {
    let textKey = this.cardvalues[index].TextKey;
    let text = this.cardvalues[index].Text;
    let dora = this.cardvalues[index].Dora;
    let karl = this.cardvalues[index].Karl;
    let prewordsplit = textKey.split(" ");
    let isInTag = false;
    let tempInTagArr = [];
    let wordsplit = [];
    console.log("prewordsplit is =>", prewordsplit);
    for (let i = 0; i < prewordsplit.length; i++) {
      console.log('prewordsplit[i]', prewordsplit[i]);
      if (isInTag) {
        if (prewordsplit[i].includes("</prosody>")) {
          tempInTagArr.push(prewordsplit[i]);
          wordsplit.push(tempInTagArr.join(' '));
          isInTag = false;
          tempInTagArr = [];
        } else if (prewordsplit[i].includes('</phoneme>')) {
          tempInTagArr.push(prewordsplit[i]);
          wordsplit.push(tempInTagArr.join(' '));
          isInTag = false;
          tempInTagArr = [];
        } else if (prewordsplit[i].includes('/>')) {
          tempInTagArr.push(prewordsplit[i]);
          wordsplit.push(tempInTagArr.join(' '));
          isInTag = false;
          tempInTagArr = [];
        } else {
          tempInTagArr.push(prewordsplit[i]);
        }

      } else {

        if (prewordsplit[i].includes("<prosody")) {
          isInTag = true;
          tempInTagArr.push(prewordsplit[i]);
        } else if (prewordsplit[i].includes('<phoneme')) {
          isInTag = true;
          tempInTagArr.push(prewordsplit[i]);
        } else if (prewordsplit[i].includes('<break')) {
          isInTag = true;
          tempInTagArr.push(prewordsplit[i]);
        } else {
          wordsplit.push(prewordsplit[i]);
        }
      }
    }
    wordsplit = wordsplit.filter(function (e) {
      return e
    });
    console.log("wordsplit is =>", wordsplit);
    console.log("textKey is =>", textKey);
    console.log("text is =>", text);
    const dialogRef = this.dialog.open(UpdateVoiceModal, {
      data: {
        wordsplit: wordsplit,
        text: text,
        identity: id,
        typeofgame: this.chosentypeofgame,
        typeofdifficulty: this.chosendifficulty,
        dora: dora,
        karl: karl

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

@Component({
  selector: 'update-voice-modal-content',
  templateUrl: './update-voice-modal.html',
  styleUrls: ['../newVoice/new-voice-component.css']

})

export class UpdateVoiceModal {

  typeindex: number[] = [];
  typesArr: string[][] = [];
  wordsplit: string[] = [];
  selectedType: boolean[][] = [];
  text = "";
  identity: string = "";
  difficulty: string = "";
  game: string = "";
  dora: string = "";
  karl: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private api: APIService, public dialog: MatDialog) {
    iconRegistry.addSvgIcon(
      'ear',
      sanitizer.bypassSecurityTrustResourceUrl('assets/ear.svg'));
    
    this.dora = data.dora;
    this.karl = data.karl;
    this.wordsplit = data.wordsplit;
    this.text = data.text;
    this.identity = data.identity;
    let textArr = this.text.split(" ");
    let index = 0;
    this.difficulty = data.typeofdifficulty;
    this.game = data.typeofgame;

    for (const element of this.wordsplit) {

      if (element[0] === '<') {

        if (element[1] + element[2] === 'ph') {
          let word = element.substring(element.indexOf('>') + 1, element.indexOf('</'));
          let wordWithT = `${word.substring(0, word.indexOf('ll'))}tl${word.substring(word.indexOf('ll')+2, word.length)}`;
          let wordWithoutT = `${word.substring(0, word.indexOf('ll'))}ll${word.substring(word.indexOf('ll')+2, word.length)}`;
          let newStringArr = [
            word,
            sampa(wordWithT),
            sampa(wordWithoutT)

          ];
          this.typesArr.push(newStringArr);
          if (element === newStringArr[0]) {
            this.selectedType.push([true, false, false, false]);
            this.typeindex.push(0);
          } else if (element === newStringArr[1]) {
            this.selectedType.push([false, true, false, false]);
            this.typeindex.push(1);
          } else if (element === newStringArr[2]) {
            this.selectedType.push([false, false, true, false]);
            this.typeindex.push(2);
          } else {
            this.selectedType.push([false, false, false, true]);
            this.typeindex.push(3);
          }
          this.wordsplit[index] = word;


        } else if (element[1] + element[2] === 'br') {
          this.typesArr.push([element]);
          this.selectedType.push([true]);
          this.typeindex.push(0);
        } else if (element[1] + element[2] === 'pr') {
          // let temp = element.split('</phoneme></prosody></prosody>')[0].split('>');
          // let sound = temp[temp.length-1];
          this.wordsplit[index] = element;
          this.typesArr.push([element]);
          this.selectedType.push([true]);
          this.typeindex.push(0);
        }

      } else {



        if (element.includes('ll')) {
          let wordWithoutT = `${element.substring(0, element.indexOf('ll'))}ll${element.substring(element.indexOf('ll')+2, element.length)}`;
          let wordWithT = `${element.substring(0, element.indexOf('ll'))}tl${element.substring(element.indexOf('ll')+2, element.length)}`;
          console.log("wordwitht is => ", wordWithT);
          let newStringArr = [
            element,
            sampa(wordWithT),
            sampa(wordWithoutT)

          ];
          this.typesArr.push(newStringArr);
          this.selectedType.push([true, false, false, false, false]);
          this.typeindex.push(0);
        } else {
          this.typesArr.push([element]);
          this.selectedType.push([true]);
          this.typeindex.push(0);
        }

      }
      index++;
    }
  }


  addSound(index: number) {
    let dialogRef = this.dialog.open(UpdateLetterSound);
    dialogRef.afterClosed().subscribe(result_type => {
      if (result_type) {
        let [result,type] = [result_type.split("_")[0],result_type.split("_")[1]];
        if(type === "texti") {
          let sampares = '<prosody volume="x-loud">' + result + '</prosody>';
          this.typesArr.splice(index + 1, 0, [sampares]);
          this.wordsplit.splice(index + 1, 0, result);
          this.selectedType.splice(index + 1, 0, [true]);
          this.typeindex.splice(index + 1, 0, 0);
        }
        else {
          console.log("result is => ", result);
          let sampares = '<prosody rate="50%"><prosody volume="x-loud">' + sampa(result) + '</prosody></prosody>';
          this.typesArr.splice(index + 1, 0, [sampares]);
          this.wordsplit.splice(index + 1, 0, result);
          this.selectedType.splice(index + 1, 0, [true]);
          this.typeindex.splice(index + 1, 0, 0);
        }
      }
    });
  }

  addSilent(index: number) {
    let dialogRef = this.dialog.open(UpdateSilentSound);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let resText = `<break time="${result}ms"/>`
        this.typesArr.splice(index + 1, 0, [resText]);
        this.wordsplit.splice(index + 1, 0, resText);
        this.selectedType.splice(index + 1, 0, [true]);
        this.typeindex.splice(index + 1, 0, 0);
      }
    });
  }

  removeCard(index: number) {
    this.typesArr.splice(index, 1);
    this.wordsplit.splice(index, 1);
    this.selectedType.splice(index, 1);
    this.typeindex.splice(index, 1);
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
    console.log("typesArr is", this.typesArr)
  }
  listenKarl(input: string[], index: number) {


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

  changeToggle(wordIndex: number, newToggleIndex: number) {
    console.log("we are at the correct position");
    console.log("wordIndex is", wordIndex);
    console.log("newToggleIndex is", newToggleIndex);
    this.typeindex[wordIndex] = newToggleIndex;
  }

  isToggle(wordIndex: number, newToggleIndex: number) {
    if (this.typeindex[wordIndex] === newToggleIndex) {
      return true;
    }
    return false;
  }

  // listen to the sentence Karl after build
  listenToSentenceKarlAfterBuild() {
    let sentence = "";
    for (let i = 0; i < this.typesArr.length; i++) {
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
    for (let i = 0; i < this.typesArr.length; i++) {
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


  // Save the string
  saveString() {
    let textkey = "";
    for (let i = 0; i < this.wordsplit.length; i++) {
      textkey = textkey + this.typesArr[i][this.typeindex[i]] + " ";
    }
    const dialogRef = this.dialog.open(UpdateSaveVoiceModal, {

      data: {
        textkey: textkey,
        text: this.text,
        identity: this.identity,
        eSelectedDifficulty: this.difficulty,
        eSelectedGame: this.game,

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result is =>", result);
      this.dialog.closeAll();
    });
  }

}


@Component({
  selector: 'updatesilentsound',
  templateUrl: './updatesilentsound.html',

})
export class UpdateSilentSound {

}
@Component({
  selector: 'updatelettersound',
  templateUrl: './updatelettersound.html',
  styleUrls: ['../newVoice/new-voice-component.css']


})
export class UpdateLetterSound {
  selectedType: string = 'fyrir-skilgreint-sampa';
  types: string[] = ['fyrir-skilgreint-sampa', 'texti'];
}
@Component({
  selector: 'update-save-voice-content',
  templateUrl: './update-save-voice-modal.html',
  styleUrls: ['../newVoice/new-voice-component.css']

})


export class UpdateSaveVoiceModal {

  dora: string = "";
  karl: string = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: FinalDialogData, private api: APIService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    this.dora = data.dora;
    this.karl = data.karl;

  }




  playAudio(url: any) {
    let audio = new Audio();
    audio.src = url;
    audio.load();
    audio.play();
  }

  openSnackBar(message: string) {

    this._snackBar.open(message, undefined, {
      duration: 3000,
    });
  }

  speakNow() {
    let d = {
      id: this.data.identity,
      text: this.data.text,
      textkey: this.data.textkey,
      typeofgame: this.data.eSelectedGame,
      typeofdifficulty: this.data.eSelectedDifficulty,
    }
    this.api.update(d).subscribe((result: any) => {
      console.log("result is =>", result);
      this.dora = result.doraUrl;
      this.karl = result.karlUrl;
      this.openSnackBar("Tókst að uppfæra hljóð");
    },(error: any) => {
      this.openSnackBar("Ekki tókst að vista hljóð");
    });
  }

  

}
