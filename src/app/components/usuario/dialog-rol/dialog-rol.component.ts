import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NgModule} from '@angular/core';
export interface DialogData {
  tipoUser: string
  tiposUsers:[]
}

 @Component({
  selector: 'app-dialog-rol',
  templateUrl: './dialog-rol.component.html',
  styleUrls: ['./dialog-rol.component.css']
})

export class DialogRolComponent implements OnInit {
  ngOnInit(){}
  constructor(public dialogo: MatDialogRef<DialogRolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  onNoClick(): void {
   this.dialogo.close();
 }
}
