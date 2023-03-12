import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from '../model/IDialogData';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { SnackbarAnnotatedComponentExampleStackComponent } from '../snackbar-annotated-component-example-stack/snackbar-annotated-component-example-stack.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  //constructor(public dialogRef: MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public data: IDialogData) {}
  ProductAgeList = ["Brand New", "Second Hand","Refurbished"];
  addProductForm! : FormGroup;
  actionBtn : string = "Save";

  constructor(private formbuilder : FormBuilder,
    private apiService: ApiService,
    private dialogRef : MatDialogRef<DialogComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editData : any
  )
  {


  }

  ngOnInit(): void
  {
      this.addProductForm = this.formbuilder.group({
        productName : ['',Validators.required],
        productCategory : ['',Validators.required],
        productAge : ['',Validators.required],
        price : ['',Validators.required],
        comment : ['',Validators.required],
        date : ['',Validators.required]
      });

      if(this.editData)
      {
        this.actionBtn = "Update";
        this.addProductForm.controls['productName'].setValue(this.editData.productName);
        this.addProductForm.controls['productCategory'].setValue(this.editData.productCategory);
        this.addProductForm.controls['productAge'].setValue(this.editData.productAge);
        this.addProductForm.controls['price'].setValue(this.editData.price);
        this.addProductForm.controls['comment'].setValue(this.editData.comment);
        this.addProductForm.controls['date'].setValue(this.editData.date);
      }


  }

  addProduct(){

    if(!this.editData){

      if(this.addProductForm.valid){
        this.apiService.postProduct(this.addProductForm.value)
        .subscribe({
          next:(res)=> {

            this.openSnackBar("Product Added Successfully","X",3);
            this.addProductForm.reset();
            this.dialogRef.close("save");
          },
          error:()=> {

            this.openSnackBar("Product Could not be saved","X",3);
          }
        });
      }
    }
    else{

      this.apiService.updateProduct(this.addProductForm.value,this.editData.id).subscribe(
        {
          next: (res)=> {

            this.openSnackBar("Updated Product Successfully","",3);
            this.addProductForm.reset();
            this.dialogRef.close("update");
          },
          error:(res)=>{
            this.openSnackBar("Something Went wrong Deleting Product","",3)
          }
        }
      );
    }

  }

  openSnackBar(message: string, action: string, durationInSeconds : number = 3)
  {
      /*
        this._snackBar.open(message, action,
        {
          duration : durationInSeconds
        });
      */

      this._snackBar.openFromComponent(SnackbarAnnotatedComponentExampleStackComponent, {
        duration: durationInSeconds * 1000,
        data: message,
        horizontalPosition: "center",
        verticalPosition: "bottom",
      });
  }

}


