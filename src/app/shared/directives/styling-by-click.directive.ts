import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appStylingByClick]'
})
export class StylingByClickDirective {
  @Input('appStylingByClick') textColor: string;

  defaultTextColor = 'navy';

  constructor(
    private el: ElementRef,
    private render: Renderer2
  ) {}

  @HostListener('click', ['$event'])
  enter(event: Event) {
    this.render.setStyle(
      this.el.nativeElement,
      'color',
      this.textColor || this.defaultTextColor
    );
  }
}
