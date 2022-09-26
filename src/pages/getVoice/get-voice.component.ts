import {
  Component
} from '@angular/core';
import {
  APIService
} from '../../app/api.service'
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogComponent } from 'src/components/dialog.component';
import {SnackBarComponent} from 'src/components/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

// import {MatRadioModule} from '@angular/material/radio';


@Component({
  selector: 'app-root',
  templateUrl: './get-voice.component.html',
  styleUrls: ['get-voice.component.css'],
})
export class GetVoiceComponent {


  constructor(private api: APIService, public dialog: MatDialog, private _snackBar: MatSnackBar) {}


  openSnackBar(message: string) {
    
    this._snackBar.open(message,undefined,{
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

  deleteData(id: any,index: any) {
    let dialog = this.dialog.open(DialogComponent, {
      width: '250px'
    });
      dialog.afterClosed().subscribe(result => {
        if(result === "yes") {          
          console.log("id is =>", id);
          this.api.delete({
            id: id,
            typeofgame: this.chosentypeofgame,
            typeofdifficulty: this.chosendifficulty
      
          }).subscribe((result: any) => {
            this.openSnackBar("Tókst að eyða");
            this.cardvalues.splice(index,1);
          });
    }
      }
    );
    


}

  updateData(id: any) {
    console.log("id is =>", id);
    console.log("hello world from update");
  }
  

}
