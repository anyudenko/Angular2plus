import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightByHoverDirective } from './directives/highlight-by-hover.directive';
import { StylingByClickDirective } from './directives/styling-by-click.directive';

import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HighlightByHoverDirective,
    StylingByClickDirective,
    OrderByPipe
  ],
  exports: [
    HighlightByHoverDirective,
    StylingByClickDirective,
    OrderByPipe
  ]
})
export class SharedModule { }
