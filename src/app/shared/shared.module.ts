import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightByHoverDirective } from './directives/highlight-by-hover.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HighlightByHoverDirective
  ],
  exports: [
    HighlightByHoverDirective
  ]
})
export class SharedModule { }
