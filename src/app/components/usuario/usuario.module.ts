import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent } from './crud/crud.component';
import { PerfilComponent } from "./perfil/perfil.component";
import { UsuarioRoutingModule } from "./usuario.routing";
import { MaterialModule } from '../../material/material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { DialogRolComponent } from './dialog-rol/dialog-rol.component';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component'
import { ImagenCropperModule } from '../imgUploader/imagen-cropper.module'

@NgModule({
  declarations: [
    CrudComponent,
    PerfilComponent,
    DialogRolComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ImagenCropperModule,
  ],
  entryComponents: [// <--- Aquí va el dialogo
    DialogRolComponent,
    ConfirmationDialogComponent,
  ]
})
export class UsuarioModule { }
