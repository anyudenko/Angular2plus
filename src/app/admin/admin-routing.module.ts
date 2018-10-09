import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ManageProductsComponent, ManageOrdersComponent } from './components';
import { AuthGuard } from './../core';

const routes: Routes = [
  {
    path: '', //lazy-loading in root AppRoutingModule
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          {
            path: 'products',
            component: ManageProductsComponent
          },
          {
            path: 'orders',
            component: ManageOrdersComponent
          },
          {
            path: '',
            redirectTo: 'products',
          }
        ]
      }
    ]
  }
];

export const adminRouterComponents = [
  AdminComponent,
  ManageProductsComponent,
  ManageOrdersComponent
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
