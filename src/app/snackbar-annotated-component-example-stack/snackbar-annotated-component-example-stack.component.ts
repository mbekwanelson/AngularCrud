import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef,MatSnackBar,MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-snackbar-annotated-component-example-stack',
//   templateUrl: './snackbar-annotated-component-example-stack.component.html',
//   styleUrls: ['./snackbar-annotated-component-example-stack.component.scss']
// })
// export class SnackbarAnnotatedComponentExampleStackComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


@Component({
  selector: 'app-snackbar-annotated-component-example-stack',
  templateUrl: 'snackbar-annotated-component-example-stack.component.html',
  styleUrls: ['./snackbar-annotated-component-example-stack.component.scss']
})
export class SnackbarAnnotatedComponentExampleStackComponent{
    //snackBarRef = inject(MatSnackBarRef);
    //constructor() { }

    constructor(public snackBar: MatSnackBar, @Inject(MAT_SNACK_BAR_DATA) public data: any) {}

    public dismissSnackbar(): void {
      this.snackBar.dismiss();
  }
}
