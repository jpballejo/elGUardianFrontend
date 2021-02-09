import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import{ImagenCropperComponent} from '../imagen-cropper/imagen-cropper.component'
@Component({
  selector: 'app-btn-upload',
  templateUrl: './btn-upload.component.html',
  styleUrls: ['./btn-upload.component.css']
})
export class BtnUploadComponent implements OnInit {
  @Output()
   propagar2 = new EventEmitter<string>();
  constructor( public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ImagenCropperComponent, {
    //  width: '250px',
      data: {imagenDevolucion:null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

    });
  };
  procesaPropagar(dato){
    this.propagar2.emit(dato);
  }

}
