import { AfterViewInit, Component, ContentChildren, Directive, ElementRef, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { CarouselItemDirective } from '../carrousel-item.directive';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';
@Directive({
  selector: 'carouselItem'
})
export class CarouselItemElement {
}
@Component({
  selector: 'carousel',
  exportAs: 'carousel',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit,AfterViewInit {

  @ContentChildren(CarouselItemDirective) items : QueryList<CarouselItemDirective>;
  @ViewChildren(CarouselItemElement, { read: ElementRef }) private itemsElements : QueryList<ElementRef>;
  @ViewChild('carousel') private carousel : ElementRef;
  @Input() timing = '250ms ease-in';
  @Input() showControls = true;
  private player : AnimationPlayer;
  private itemWidth : number;
  private currentSlide = 0;
  carouselWrapperStyle = {}

/*  next() {
     if( this.currentSlide + 1 === this.items.length ) return;
     this.currentSlide = (this.currentSlide + 1) % this.items.length;
     const offset = this.currentSlide * this.itemWidth;
     const myAnimation : AnimationFactory = this.buildAnimation(offset);
     this.player = myAnimation.create(this.carousel.nativeElement);
     this.player.play();
   }

   private buildAnimation( offset ) {
     return this.builder.build([
       animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
     ]);
   }

   prev() {
     if( this.currentSlide === 0 ) return;

     this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
     const offset = this.currentSlide * this.itemWidth;

     const myAnimation : AnimationFactory = this.buildAnimation(offset);
     this.player = myAnimation.create(this.carousel.nativeElement);
     this.player.play();
   }*/
/*
   ngAfterContentInit() {
     setTimeout(() => {
       this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
       this.carouselWrapperStyle = {
         width: `${this.itemWidth}px`
       }
     });
   }*/
   constructor( private builder : AnimationBuilder ) {
   }
   ngOnInit() {
        console.log(this.itemsElements);

  }
   ngAfterViewInit() {
     // For some reason only here I need to add setTimeout, in my local env it's working without this.
/*
     setTimeout(() => {
       console.log(this.itemsElements.first);
       this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
       this.carouselWrapperStyle = {
         width: `${this.itemWidth}px`
       }
     });
*/
   }
}
