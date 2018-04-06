import { Action } from '@ngrx/store';
import { Entry } from 'app/core/models/entry';

export enum UploadActionTypes {
  UploadAction = '[Upload] Upload entry',
  UploadSuccessAction = '[Upload] Upload entry success',
  UploadFailureAction = '[Upload] Upload entry failure'
}

export class Upload implements Action {
  readonly type = UploadActionTypes.UploadAction;
  constructor(public payload: { file: File, entry: Entry }) { }
}

export class UploadSuccess implements Action {
  readonly type = UploadActionTypes.UploadSuccessAction;
  constructor(public payload: { url: string, entry: Entry }) { }
}

export class UploadFailure implements Action {
  readonly type = UploadActionTypes.UploadFailureAction;
  constructor(public error: any) { }
}
export type UploadActions =
  | Upload
  | UploadSuccess
  | UploadFailure;
