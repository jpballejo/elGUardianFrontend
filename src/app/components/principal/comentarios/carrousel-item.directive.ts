import { Directive, TemplateRef,Renderer2 } from '@angular/core';

@Directive({
  selector: '[carouselItem]'
})
export class CarouselItemDirective {

  constructor( private renderer: Renderer2,public tpl : TemplateRef<any> ) {
  }

}
