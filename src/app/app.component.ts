import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent
{
  title = 'We Sell';

  constructor(private dialog : MatDialog)
  {

  }

  openDialog(): void
  {

    this.dialog.open(DialogComponent,
      {
        width: '250px',
        data : {
         animal : 'panda'
        }
      });

  }


}
