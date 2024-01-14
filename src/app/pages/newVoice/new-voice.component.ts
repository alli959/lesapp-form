import { Component, Inject } from '@angular/core';
import { APIService } from '../../services/api.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

// Using Icelandic sampa dictionary, replace word with sampa
export function sampa(word: string) {
  const sampaDict: any = {
    a: 'a',
    á: 'au',
    b: 'b',
    d: 'd',
    ð: 'D',
    e: 'E',
    é: 'e:',
    f: 'f',
    g: 'G',
    h: 'h',
    i: 'I',
    í: 'i:',
    j: 'j',
    k: 'k_h',
    l: 'l',
    m: 'm',
    n: 'n',
    o: 'O',
    ó: 'Ou',
    p: 'p_h',
    r: 'r',
    s: 's',
    t: 'd',
    u: 'Y',
    ú: 'u:',
    v: 'v',
    x: 'x',
    y: 'I',
    ý: 'i',
    þ: 'T',
    æ: 'aE',
    ö: '9',
    A: 'a',
    Á: 'au',
    B: 'b',
    D: 'd',
    Ð: 'D',
    E: 'E',
    É: 'e:',
    F: 'f',
    G: 'g',
    H: 'h',
    I: 'I',
    Í: 'i:',
    J: 'j',
    K: 'k_h',
    L: 'l',
    M: 'm',
    N: 'n',
    O: 'O',
    Ó: 'Ou',
    P: 'p_h',
    R: 'r',
    S: 's',
    T: 'd',
    U: 'Y',
    Ú: 'u:',
    V: 'v',
    X: 'x',
    Y: 'I',
    Ý: 'i',
    Þ: 'T',
    Æ: 'aE',
    Ö: '9',
    ':': ':',
  };
  let sampaWord = '';
  for (let i = 0; i < word.length; i++) {
    let w = word[i];
    let s = sampaDict[w];
    sampaWord += s;
  }
  console.log('sampa word is =>', sampaWord);
  return `<phoneme alphabet="x-sampa" ph="${sampaWord}">${word}</phoneme>`;
}

export interface DialogData {
  wordsplit: [];
}
export interface FinalDialogData {
  textkey: '';
  text: '';
}

@Component({
  selector: 'app-root',
  templateUrl: './new-voice.component.html',
  styleUrls: ['./new-voice.component.css'],
})
export class NewVoiceComponent {
  wordsplit: string[] = [];
  voices = ['Karl', 'Dora'];
  selectedVoice = 'Karl';
  typeOfGame = ['sentences', 'words', 'letters'];
  selectedGame = 'sentences';
  typeOfDifficulty = ['easy', 'medium', 'hard'];
  selectedDifficulty = 'easy';

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
    };
    this.api.listen(data).subscribe((result: any) => {
      this.playAudioBuffer(result[0].data);
    });
  }

  buildVoice(input: string) {
    this.wordsplit = input.split(' ');
    let data = {
      textkey: input,
      voiceid: this.selectedVoice,
    };
    this.api.listen(data).subscribe((result: any) => {
      this.playAudioBuffer(result[0].data);
    });
    const dialogRef = this.dialog.open(NewVoiceModal, {
      data: {
        wordsplit: this.wordsplit,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  speakNow(input: string) {
    let data = {
      text: input,
      voice: this.selectedVoice,
      typeofgame: this.selectedGame,
      typeofdifficulty: this.selectedDifficulty,
    };
    this.api.speak(data).subscribe((result: any) => {
      this.playAudio(result[0].url);
    });
  }
}

@Component({
  selector: 'voice-modal-content',
  templateUrl: './new-voice-modal.html',
  styleUrls: ['./new-voice-component.css'],
})
export class NewVoiceModal {
  typeindex: number[] = [];
  typesArr: string[][] = [];
  wordsplit: string[] = [];
  selectedType: boolean[][] = [];
  text = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private api: APIService,
    public dialog: MatDialog
  ) {
    iconRegistry.addSvgIcon(
      'ear',
      sanitizer.bypassSecurityTrustResourceUrl('assets/ear.svg')
    );

    this.wordsplit = data.wordsplit;
    this.text = data.wordsplit.join(' ');

    for (const element of this.wordsplit) {
      if (element.includes('ll')) {
        let wordWithoutT = `${element.substring(
          0,
          element.indexOf('ll')
        )}ll${element.substring(element.indexOf('ll') + 2, element.length)}`;
        let wordWithT = `${element.substring(
          0,
          element.indexOf('ll')
        )}tl${element.substring(element.indexOf('ll') + 2, element.length)}`;
        console.log('wordwitht is => ', wordWithT);
        let newStringArr = [element, sampa(wordWithT), sampa(wordWithoutT)];
        this.typesArr.push(newStringArr);
        this.selectedType.push([true, false, false, false, false]);
      } else {
        this.typesArr.push([element]);
        this.selectedType.push([true]);
      }
      this.typeindex.push(0);
    }
  }

  addSound(index: number) {
    let dialogRef = this.dialog.open(LetterSound);
    dialogRef.afterClosed().subscribe((result_type) => {
      if (result_type) {
        let [result, type] = [
          result_type.split('_')[0],
          result_type.split('_')[1],
        ];
        if (type === 'texti') {
          let sampares = '<prosody volume="x-loud">' + result + '</prosody>';
          this.typesArr.splice(index + 1, 0, [sampares]);
          this.wordsplit.splice(index + 1, 0, result);
          this.selectedType.splice(index + 1, 0, [true]);
          this.typeindex.splice(index + 1, 0, 0);
        } else {
          console.log('result is => ', result);
          let sampares =
            '<prosody rate="50%"><prosody volume="x-loud">' +
            sampa(result) +
            '</prosody></prosody>';
          this.typesArr.splice(index + 1, 0, [sampares]);
          this.wordsplit.splice(index + 1, 0, result);
          this.selectedType.splice(index + 1, 0, [true]);
          this.typeindex.splice(index + 1, 0, 0);
        }
      }
    });
  }

  addSilent(index: number) {
    let dialogRef = this.dialog.open(SilentSound);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let resText = `<break time="${result}s"/>`;
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
    console.log('typesArr is', this.typesArr);
  }
  listenKarl(input: string[], index: number) {
    let data = {
      textkey: input[this.typeindex[index]],
      voiceid: 'Karl',
    };
    this.api.listen(data).subscribe((result: any) => {
      this.playAudioBuffer(result[0].data);
    });
  }
  listenDora(input: string[], index: number) {
    let data = {
      textkey: input[this.typeindex[index]],
      voiceid: 'Dora',
    };
    this.api.listen(data).subscribe((result: any) => {
      this.playAudioBuffer(result[0].data);
    });
  }

  changeToggle(wordIndex: number, newToggleIndex: number) {
    console.log('we are at the correct position');
    console.log('wordIndex is', wordIndex);
    console.log('newToggleIndex is', newToggleIndex);
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
    let sentence = '';
    for (let i = 0; i < this.typesArr.length; i++) {
      sentence = sentence + this.typesArr[i][this.typeindex[i]] + ' ';
    }
    let data = {
      textkey: sentence,
      voiceid: 'Karl',
    };
    this.api.listen(data).subscribe((result: any) => {
      this.playAudioBuffer(result[0].data);
    });
  }
  // listen to the sentence Dora after build
  listenToSentenceDoraAfterBuild() {
    let sentence = '';
    for (let i = 0; i < this.typesArr.length; i++) {
      sentence = sentence + this.typesArr[i][this.typeindex[i]] + ' ';
    }
    let data = {
      textkey: sentence,
      voiceid: 'Dora',
    };
    this.api.listen(data).subscribe((result: any) => {
      this.playAudioBuffer(result[0].data);
    });
  }

  // Save the string
  saveString() {
    let textkey = '';
    for (let i = 0; i < this.wordsplit.length; i++) {
      textkey = textkey + this.typesArr[i][this.typeindex[i]] + ' ';
    }
    console.log('textkey is', textkey);

    const dialogRef = this.dialog.open(SaveVoiceModal, {
      data: {
        textkey: textkey,
        text: this.text,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('dialog closed');
    });
  }
}

@Component({
  selector: 'silentsound',
  templateUrl: './silentsound.html',
})
export class SilentSound {}
@Component({
  selector: 'lettersound',
  templateUrl: './lettersound.html',
  styleUrls: ['./new-voice-component.css'],
})
export class LetterSound {
  selectedType: string = 'fyrir-skilgreint-sampa';
  types: string[] = ['fyrir-skilgreint-sampa', 'texti'];
}
@Component({
  selector: 'save-voice-content',
  templateUrl: './save-voice-modal.html',
  styleUrls: ['./new-voice-component.css'],
})
export class SaveVoiceModal {
  voices = ['Karl', 'Dora'];
  selectedVoice = 'Karl';
  typeOfGame = ['Setningar', 'Orð', 'Stafir'];
  selectedGame = 'Setningar';
  typeOfDifficulty = ['Auðvelt', 'Miðlungs'];
  selectedDifficulty = 'Auðvelt';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FinalDialogData,
    private api: APIService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

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
    let eSelectedGame;
    let eSelectedDifficulty;
    if (this.selectedGame === 'Setningar') {
      eSelectedGame = 'sentences';
    } else if (this.selectedGame === 'Orð') {
      eSelectedGame = 'words';
    } else if (this.selectedGame === 'Stafir') {
      eSelectedGame = 'letters';
    }
    if (this.selectedDifficulty === 'Auðvelt') {
      eSelectedDifficulty = 'easy';
    } else if (this.selectedDifficulty === 'Miðlungs') {
      eSelectedDifficulty = 'medium';
    }
    let d = {
      text: this.data.text,
      textkey: this.data.textkey,
      typeofgame: eSelectedGame,
      typeofdifficulty: eSelectedDifficulty,
    };
    this.api.speak(d).subscribe((result: any) => {
      console.log('result is =>', result);
      this.openSnackBar('Tókst að vista hljóð');
      this.dialog.closeAll();
    });
  }
}
