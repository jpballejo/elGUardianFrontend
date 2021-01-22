import {  Component,  Directive, } from '@angular/core';




@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})

export class ComentariosComponent{

  OnInit(){}
  items = [
      {
        title: "Primer comentario",
        contenido: "comentario uno",
        imagen: "imagen1.jpg"
      },
      {
        title: "Segundo comentario",
        contenido: "comentario dos",
        imagen: "imagen2.jpg"
      },
      {
        title: "Tercer comentario",
        contenido: "comentario tres",
        imagen: "imagen3.jpg"
      },
      {
        title: "Cuarto comentario",
        contenido: "comentario cuatro",
        imagen: "imagen4.jpg"
      }
    ];

    addSlide(obj) {
      this.items.push(obj);
    }




}
