import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, take, filter } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import * as fromAuth from '../reducers';
import { AuthService } from 'app/core/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private store: Store<fromAuth.State>) { }

  canActivate(): Observable<boolean> {
    return this.authService.getLoggedIn().pipe(
      filter(authed => authed != null),
      map(authed => {
        if (!authed) {
          this.store.dispatch(new AuthActions.LoginRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
