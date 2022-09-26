import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * @title Basic snack-bar
 */
@Component({
  selector: 'snack-bar-overview-example',
  templateUrl: 'snackbar.component.html',
//   styleUrls: ['snack-bar-overview-example.css'],
})
export class SnackBarComponent {
  public static openSnackBar: any;
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string) {
    this._snackBar.open(message,undefined,{
        duration: 3000,
    });
  }
}