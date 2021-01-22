import { Component } from '@angular/core';
import {  BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-carrucel',
  templateUrl: './carrucel.component.html',
  styleUrls: ['./carrucel.component.css']
})

export class CarrucelComponent {
  /** Based on the screen size, switch from standard to one column per row */
  slides = [{ 'image': '../../../assets/resources/img1.jpg' },
  { 'image': '../../../assets/resources/img2.jpg' },
  { 'image': '../../../assets/resources/img3.jpg' },
  { 'image': '../../../assets/resources/img4.jpg' },
  { 'image': '../../../assets/resources/img1.jpg' }];

slides2=["'<button>prueba</button>'","'<button>prueba</button>'"]


  constructor(private breakpointObserver: BreakpointObserver) { }
}
