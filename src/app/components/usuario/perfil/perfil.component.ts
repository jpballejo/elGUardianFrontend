import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module'
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  perfilForm = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(''),
  });
}
