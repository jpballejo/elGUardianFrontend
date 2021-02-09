import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';
import { base64ToFile } from 'ngx-image-cropper';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CargaImagenFirestoreService } from '../../../services/carga-imagen-firestore.service';
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { MatSnackBar } from '@angular/material/snack-bar';
export interface imgDev {
  imagenDevolucion: String,
};
@Component({
  selector: 'app-imagen-cropper',
  templateUrl: './imagen-cropper.component.html',
  styleUrls: ['./imagen-cropper.component.css']
})
export class ImagenCropperComponent implements OnInit {
  @Output()
  propagar = new EventEmitter<string>();
  public imagenDevolucion = null;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  archivo: File = null;
  constructor(public dialog: MatDialog,
    public dialogo: MatDialogRef<ImagenCropperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: imgDev,
    private upImgService: CargaImagenFirestoreService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }
//////////////////////////////////EVENT-EMITER/////////////////////////

onPropagar(dato) {
   this.propagar.emit(dato);
 }


///////////////////////////////////////////////////////////////////////

//SUBIR A FIREBASE////////////////////////////////////////**************
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onNoClick(): void {
    this.dialogo.close();
  }
  seSubio() {
    this.openSnackBar('Se ha subido la imagen!', 'Aceptar');
    this.dialogo.close();
  }
  confirmation = (data) =>
    this.dialog.open(ConfirmationDialogComponent, { data: data })
      .afterClosed()
      .subscribe(result => {
        console.log(result)
        if (result == true) {
          this.upImgService.upload(this.imagenDevolucion);
          this.upImgService.uploadProgress.subscribe(d => d == 100 ? this.seSubio() : null);
          this.upImgService.uploadURL.subscribe(d => this.onPropagar(d));
          return true;
        } else return false;
      })
  subir() {
    if (this.imagenDevolucion) {
      this.confirmation('Desea subir la imagen?');
    }
    else { this.openSnackBar('Debe seleccionar una imagen.', 'Aceptar'); }
  }

//SUBIR A FIREBASE////////////////////////////////////////*************
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    var file = this.dataURLtoFile(this.croppedImage, 'coso.png');
    console.log('event: ', event, 'blob: ', base64ToFile(event.base64));
    console.log(file);
    this.imagenDevolucion = new File([base64ToFile(event.base64)], 'fileName.jpg', { type: "image/jpeg", lastModified: new Date().getMilliseconds() });
  }

  dataURLtoFile(dataurl, filename) {

    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady() {
    console.log('Cropper ready');
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }


  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }
}
