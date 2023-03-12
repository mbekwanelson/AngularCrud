import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from '../model/IDialogData';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  //constructor(public dialogRef: MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public data: IDialogData) {}
  ProductAgeList = ["Brand New", "Second Hand","Refurbished"];
  addProductForm! : FormGroup;

  constructor(private formbuilder : FormBuilder){


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
  }

  addProduct(){
    console.log('saved');
    console.log(this.addProductForm.value);

  }

}
