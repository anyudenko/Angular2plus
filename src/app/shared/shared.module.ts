import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightByHoverDirective, StylingByClickDirective } from './directives';
import { OrderByPipe } from './pipes';

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
