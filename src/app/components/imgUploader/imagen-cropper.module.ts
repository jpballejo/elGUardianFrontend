import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenCropperComponent } from './imagen-cropper/imagen-cropper.component'
import { BtnUploadComponent } from './btn-upload/btn-upload.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component'
@NgModule({
  declarations: [ImagenCropperComponent, BtnUploadComponent,ConfirmationDialogComponent],
  imports: [ImageCropperModule, FormsModule,
    CommonModule, MaterialModule,
  ],
  exports: [BtnUploadComponent],
  entryComponents: [ImagenCropperComponent,ConfirmationDialogComponent],
})
export class ImagenCropperModule { }
