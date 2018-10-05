import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PathNotFoundComponent, ContactUsComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    PathNotFoundComponent,
    ContactUsComponent
  ]
})
export class LayoutModule { }
