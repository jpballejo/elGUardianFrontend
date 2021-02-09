import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service'
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../../shared/models/user.interface'
import { environment } from '../../../../environments/environment'
import { CargaImagenFirestoreService } from '../../../services/carga-imagen-firestore.service';
interface depto {
  departamento: String,
};
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  //////////////VARIABLES////////////////////////////////
  departamentos: depto[] = environment.departamentos;
  public uid: String = null;
  public editar$ = new BehaviorSubject(true);
  private perfil: User = null;
  perfilForm: FormGroup;
  fotoPerfil$: BehaviorSubject<String>;
  /////////////////////////////VARIABLES********************

  constructor(private userService: UserService, private upImgService: CargaImagenFirestoreService) {
    this.fotoPerfil$ = new BehaviorSubject(null);
    this.editar$.subscribe((val) => {
      console.log('VALOR EDITAR: ', val);
    })
    this.perfilForm = new FormGroup({
      nombre: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      celular: new FormControl(''),
      calle: new FormControl(''),
      numPuerta: new FormControl(''),
      esquina: new FormControl(''),
      departamento: new FormControl(''),
      apto: new FormControl(''),
      ciudad: new FormControl(''),
      codigoPostal: new FormControl(''),
    });
    this.upImgService.uploadURL.subscribe(d => this.vinoImagen(d));
    if (this.uid == null) this.cargarUsuario(null);
    if (this.uid != null) this.cargarUsuario(this.uid);
  }
  vinoImagen(img) {
    this.fotoPerfil$.next(img);
  }
  ngOnInit(): void {

  }
  ////////////////////////////////////FUNCIONES///////////////////////////////////////////////////

  /**
   * [cargarUsuario Carga un usuario en el componente Perfil.]
   * @param  id [id del usuario *(uid)]
   * @return    [VOID]
   */

  public cargarUsuario = (id) => {
    this.userService.getUserInfo(id).subscribe((user) => {
      this.setUser(user);
      this.perfil = user;
    })
  }
  private setUser(user: User) {
    this.perfilForm.controls['nombre'].setValue(user.displayName);
    this.perfilForm.controls['email'].setValue(user.email);
    this.perfilForm.controls['email'].disable();
    this.perfilForm.controls['celular'].setValue(user.celular ? user.celular : user.phoneNumber ? user.phoneNumber : 0);

    if (user.direccion) {
      this.perfilForm.controls['calle'].setValue(user.direccion.calle ? user.direccion.calle : null);
      this.perfilForm.controls['numPuerta'].setValue(user.direccion.numPuerta ? user.direccion.numPuerta : null);
      this.perfilForm.controls['esquina'].setValue(user.direccion.esquina ? user.direccion.esquina : null);
      this.perfilForm.controls['apto'].setValue(user.direccion.apto ? user.direccion.apto : null);
      this.perfilForm.controls['departamento'].setValue(user.direccion.departamento ? user.direccion.departamento : null);
      this.perfilForm.controls['ciudad'].setValue(user.direccion.ciudad ? user.direccion.ciudad : null);
      this.perfilForm.controls['codigoPostal'].setValue(user.direccion.codigoPostal ? user.direccion.codigoPostal : null);
    }
    this.bloquear(true);
  }

  //**************************************************************************************************//

  /**
   * [editar description]
   * @return [description]
   */

  editar() {
    this.editar$.next(false);
    this.bloquear(false);
  }

  //**************************************************************************************************//

  bloquear(isBloq) {

    if (isBloq) {
      this.perfilForm.controls['calle'].disable();
      this.perfilForm.controls['nombre'].disable();
      this.perfilForm.controls['celular'].disable();
      this.perfilForm.controls['calle'].disable();
      this.perfilForm.controls['numPuerta'].disable();
      this.perfilForm.controls['esquina'].disable();
      this.perfilForm.controls['apto'].disable();
      this.perfilForm.controls['departamento'].disable();
      this.perfilForm.controls['ciudad'].disable();
      this.perfilForm.controls['codigoPostal'].disable();
      console.log('Bloqeado');
    }
    if (!isBloq) {
      this.perfilForm.controls['calle'].enable();
      this.perfilForm.controls['nombre'].enable();
      this.perfilForm.controls['celular'].enable();
      this.perfilForm.controls['calle'].enable();
      this.perfilForm.controls['numPuerta'].enable();
      this.perfilForm.controls['esquina'].enable();
      this.perfilForm.controls['apto'].enable();
      this.perfilForm.controls['departamento'].enable();
      this.perfilForm.controls['ciudad'].enable();
      this.perfilForm.controls['codigoPostal'].enable();
      console.log('Desbloqeado');
    }
  }

  //**************************************************************************************************//


  /**
   * [aceptar description]
   * @return [description]
   */

  aceptar() {

    this.editar$.next(true);
    this.bloquear(true);
    var resp = this.invocarDialogo('YA TU SABE BB');
    if (resp) {
      this.modificarUser();
    }
  };

  invocarDialogo(mensaje: String): Boolean {
    console.log(mensaje);
    return true;
  }

  modificarUser() {
    console.log('#ModificarUser_');
    this.perfilForm.controls['calle'].value;
    this.perfilForm.controls['nombre'].value;
    this.perfilForm.controls['celular'].value;
    this.perfilForm.controls['calle'].value;
    this.perfilForm.controls['numPuerta'].value;
    this.perfilForm.controls['esquina'].value;
    this.perfilForm.controls['apto'].value;
    this.perfilForm.controls['departamento'].value;
    this.perfilForm.controls['ciudad'].value;
    this.perfilForm.controls['codigoPostal'].value;
  }

  //**************************************************************************************************//

  /**
   * [cancelar description]
   * @return [description]
   */

  cancelar() {

    this.editar$.next(true);
    this.bloquear(true);
  };

  //**************************************************************************************************//
  procesaPropagar(mensaje) {
    console.log(mensaje);
  }

}
