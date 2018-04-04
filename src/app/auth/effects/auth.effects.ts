import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mapTo, catchError, mergeMap } from 'rxjs/operators';

import { AuthActions, AuthActionTypes, Login, LoginSuccess, LoginFailure } from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

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

  constructor(
    private actions$: Actions,
    private authService: AuthService) { }
}
