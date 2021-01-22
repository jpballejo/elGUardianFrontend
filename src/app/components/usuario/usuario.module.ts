import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent } from './crud/crud.component';
import { PerfilComponent } from "./perfil/perfil.component";
import { UsuarioRoutingModule } from "./usuario.routing";
import { MaterialModule } from '../../material/material.module'
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [CrudComponent, PerfilComponent],
  imports: [
    CommonModule, UsuarioRoutingModule, MaterialModule,ReactiveFormsModule
  ]
})
export class UsuarioModule { }
