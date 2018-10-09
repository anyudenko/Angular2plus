import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent, ProductFormComponent } from './components';
import { AuthGuard } from './../core';

const routes: Routes = [
  {
      path: 'home',
      component: ProductListComponent
  },
  {
      path: 'edit/:productID',
      canActivate: [AuthGuard],
      component: ProductFormComponent
  },
  {
      path: 'new',
      canActivate: [AuthGuard],
      component: ProductFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
