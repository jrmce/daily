import { Action } from '@ngrx/store';
import { User } from '@firebase/auth-types';

export enum AuthActionTypes {
  LoginAction = '[Auth] Login Action',
  LoginSuccessAction = '[Auth] Login Success Action',
  LoginFailureAction = '[Auth] Login Failure Action',
  LogoutAction = '[Auth] Logout Action'
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccessAction;
  constructor(public payload: { user: User }) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailureAction;
  constructor(public error: any) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}

export type AuthActions =
  | Login
  | LoginSuccess
  | Logout;
