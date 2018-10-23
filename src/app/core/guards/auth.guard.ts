import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route,
  NavigationExtras } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from './../+store';
import * as RouterActions from './../+store/router/router.actions';

import { Observable } from 'rxjs';

import { CoreModule } from '../core.module';
import { AuthService } from './../services';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  private checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }

    this.authService.redirectUrl = url;

    this.store.dispatch(new RouterActions.Go({
      path: ['/login']
    }));

    return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('CanActivateGuard');
    const { url } = state;
    return this.checkLogin(url);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    console.log('CanLoad Guard');
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }
}
