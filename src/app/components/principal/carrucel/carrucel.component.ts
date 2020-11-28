import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

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



  constructor(private breakpointObserver: BreakpointObserver) { }
}
