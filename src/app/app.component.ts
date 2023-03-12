import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { SnackbarAnnotatedComponentExampleStackComponent } from './snackbar-annotated-component-example-stack/snackbar-annotated-component-example-stack.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit
{
  title = 'We Sell';
  displayedColumns: string[] = ['productName', 'productCategory', 'productAge', 'price','comment','date','action'];
  pageSizes: string[] = ['productName', 'productCategory', 'productAge', 'price','comment','date'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private apisrvc : ApiService, private _snackBar: MatSnackBar)
  {

  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog(): void
  {

    this.dialog.open(DialogComponent,
      {
        width:"30%"
      })
      .afterClosed()
      .subscribe(dialogRefCloseParameter=>{
        if(dialogRefCloseParameter==="save"){
          this.getAllProducts();
        }
      });
  }

  getAllProducts()
  {
      this.apisrvc.getProduct().subscribe({
        next: (res) =>{
          console.log(res);

          //this.openSnackBar("Data Received From API","",3);

          // Assign the data to the data source for the table to render
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        },
        error:(res)=>{
          console.log(res);
          this.openSnackBar("Something went wrong on receiving Products","",3);
        }
      });
  }

  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBar(message: string, action: string="", durationInSeconds : number = 3)
  {
      this._snackBar.openFromComponent(SnackbarAnnotatedComponentExampleStackComponent, {
        duration: durationInSeconds * 1000,
        data: message,
        horizontalPosition: "center",
        verticalPosition: "bottom",
      });
  }

  editProduct(row : any)
  {
    this.dialog.open(DialogComponent,
      {
        width:"30%",
        data : row
      }).afterClosed().subscribe(dialogRefCloseParameter=>{
        if(dialogRefCloseParameter==="update"){
          this.getAllProducts();
        }
      });
  }

  deleteProduct(row: any){
    this.apisrvc.deleteProduct(row.id).subscribe({
      next:(res)=>{
        this.openSnackBar("Product Deleted Successfully","",2);
        this.getAllProducts();
      },
      error:(res)=>{

      }
    });

  }

}
