import { Action } from '@ngrx/store';
import { User } from '@firebase/auth-types';

export enum AuthActionTypes {
  LoginAction = '[Auth] Login Action',
  LoginSuccessAction = '[Auth] Login Success Action',
  LoginFailureAction = '[Auth] Login Failure Action',
  LogoutAction = '[Auth] Logout Action',
  LogoutSuccessAction = '[Auth] Logout Success Action',
  LogoutFailureAction = '[Auth] Logout Failure Action',
  LoginRedirectAction = '[Auth] Login Redirect Action'
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccessAction;
  constructor(public payload: { user: User | null, redirect: boolean }) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailureAction;
  constructor(public error: any) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LogoutSuccessAction;
}

export class LogoutFailure implements Action {
  readonly type = AuthActionTypes.LogoutFailureAction;
  constructor(public error: any) { }
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirectAction;
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | LogoutSuccess
  | LogoutFailure
  | LoginRedirect;
