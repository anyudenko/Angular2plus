import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightByHoverDirective } from './directives/highlight-by-hover.directive';
import { StylingByClickDirective } from './directives/styling-by-click.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HighlightByHoverDirective,
    StylingByClickDirective
  ],
  exports: [
    HighlightByHoverDirective,
    StylingByClickDirective
  ]
})
export class SharedModule { }
