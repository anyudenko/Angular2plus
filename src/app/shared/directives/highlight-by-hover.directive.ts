import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlightByHover]'
})
export class HighlightByHoverDirective {
  constructor() { }

  @HostBinding('class') className = 'cart-item-host-class';

  @HostListener('mouseenter', ['$event'])
  enter(event: Event) {
    (<HTMLTextAreaElement>event.target).style.backgroundColor = '#eee';
  }

  @HostListener('mouseleave', ['$event'])
  leave(event: Event) {
    (<HTMLTextAreaElement>event.target).style.backgroundColor = '';
  }
}
