import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import {
  PathNotFoundComponent,
  ContactUsComponent,
  ProductReviewsComponent,
  LoginComponent } from './layout';
import { CartListComponent } from './cart';
import { ProductListComponent } from './products';
import { AuthGuard, CustomPreloadingStrategyService } from './core';

const extraOptions: ExtraOptions = {
  preloadingStrategy: CustomPreloadingStrategyService,
};

const routes: Routes = [
  {
    path: 'product-reviews',
    component: ProductReviewsComponent,
    outlet: 'product-reviews'
  },
  {
    path: 'cart',
    component: CartListComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: '',
    redirectTo: '/home', //product list page in child ProductsRoutingModule
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PathNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
