import { Action } from '@ngrx/store';
import { Entry } from 'app/core/models/entry';

export enum EntriesActionTypes {
  LoadAllAction = '[Entries] Load All Action',
  LoadAllSuccessAction = '[Entries] Load All Success Action',
  LoadAllFailureAction = '[Entries] Load All Failure Action',
  Added = '[Entries] Added entry',
  Create = '[Entries] Create entry',
  CreateSuccess = '[Entries] Create entry success',
  CreateFailure = '[Entries] Create entry failure'
}

export class LoadAll implements Action {
  readonly type = EntriesActionTypes.LoadAllAction;
}

export class LoadAllSuccess implements Action {
  readonly type = EntriesActionTypes.LoadAllSuccessAction;
  constructor(public payload: { entries: Entry[] }) { }
}

export class LoadAllFailure implements Action {
  readonly type = EntriesActionTypes.LoadAllFailureAction;
  constructor(public error: any) { }
}

export class Added implements Action {
  readonly type = EntriesActionTypes.Added;
  constructor(public payload: Entry) { }
}

export class Create implements Action {
  readonly type = EntriesActionTypes.Create;
  constructor(public payload: Entry) { }
}

export class CreateSuccess implements Action {
  readonly type = EntriesActionTypes.CreateSuccess;
}

export class CreateFailure implements Action {
  readonly type = EntriesActionTypes.CreateFailure;
  constructor(public error: any) { }
}

export type EntriesActions =
  | LoadAll
  | LoadAllSuccess
  | LoadAllFailure
  | Added
  | Create
  | CreateSuccess
  | CreateFailure;
