import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from './../../../core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  ngOnDestroy() {
      console.log('[takeUntil ngOnDestroy]');
      this.unsubscribe.next();
      this.unsubscribe.complete();
  }

  onLogin() {
    this.authService
      .login()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        if (this.authService.isLoggedIn) {
          const redirect = this.authService.redirectUrl ?
            this.authService.redirectUrl : '/admin';

          this.router.navigate([redirect]);
      }
    },
      err => console.log(err),
      () => console.log('[takeUntil] complete')
    );
  }

  onLogout() {
    this.authService.logout();
  }
}
