import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ExtensionsService {

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
    setTimeout(() => {
      this._snackBar.dismiss()
    }, 4000);
  }
}
