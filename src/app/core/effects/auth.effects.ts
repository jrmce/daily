import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';

import {
  AuthActionTypes,
  Login,
  LoginSuccess,
  LoginFailure,
  LogoutSuccess,
  LogoutFailure,
  Logout
} from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { defer } from 'rxjs/observable/defer';

@Injectable()
export class AuthEffects {

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    mergeMap(() => {
      return this.authService.showLoginModal()
        .pipe(
          map(res => new LoginSuccess({ user: res.user })),
          catchError(error => of(new LoginFailure(error)))
        );
      }
    )
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    mergeMap(() => {
      return this.authService.hardLogout()
        .pipe(
          map(() => new LogoutSuccess()),
          catchError(error => of(new LogoutFailure(error)))
        );
    }
    )
  );

  @Effect()
  init$: Observable<Action> = defer(() => of(null)).pipe(
    mergeMap(() => {
      return this.authService.getAuthState()
        .pipe(
          map(user => {
            if (user != null) {
              return new LoginSuccess({ user });
            }

            throw new Error('No local user');
          }),
          catchError(error => of(new LoginFailure(error)))
        );
      }
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService) { }
}
