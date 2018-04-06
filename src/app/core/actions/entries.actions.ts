import { Action } from '@ngrx/store';
import { Entry } from 'app/core/models/entry';

export enum EntriesActionTypes {
  LoadAllAction = '[Entries] Load All Action',
  LoadFailureAction = '[Entries] Load Failure Action',
  LoadEntryAction = '[Entries] Load Entry Action',
  Added = '[Entries] Added entry',
  Modified = '[Entries] Modified entry',
  Removed = '[Entries] Removed entry',
  Upsert = '[Entries] Upsert entry',
  Create = '[Entries] Create entry',
  CreateSuccess = '[Entries] Create entry success',
  CreateFailure = '[Entries] Create entry failure',
  Update = '[Entries] Update entry',
  UpdateSuccess = '[Entries] Update entry success',
  UpdateFailure = '[Entries] Update entry failure'
}

export class LoadAll implements Action {
  readonly type = EntriesActionTypes.LoadAllAction;
}

export class LoadEntry implements Action {
  readonly type = EntriesActionTypes.LoadEntryAction;
  constructor(public payload: { id: string }) { }
}

export class LoadFailure implements Action {
  readonly type = EntriesActionTypes.LoadFailureAction;
  constructor(public error: any) { }
}

export class Added implements Action {
  readonly type = EntriesActionTypes.Added;
  constructor(public payload: Entry) { }
}

export class Modified implements Action {
  readonly type = EntriesActionTypes.Modified;
  constructor(public payload: Entry) { }
}

export class Removed implements Action {
  readonly type = EntriesActionTypes.Removed;
  constructor(public payload: Entry) { }
}

export class Upsert implements Action {
  readonly type = EntriesActionTypes.Upsert;
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

export class Update implements Action {
  readonly type = EntriesActionTypes.Update;
  constructor(public payload: Entry) { }
}

export class UpdateSuccess implements Action {
  readonly type = EntriesActionTypes.UpdateSuccess;
  constructor(public payload: Entry) { }
}

export class UpdateFailure implements Action {
  readonly type = EntriesActionTypes.UpdateFailure;
  constructor(public error: any) { }
}

export type EntriesActions =
  | LoadAll
  | LoadFailure
  | Added
  | Modified
  | Removed
  | Upsert
  | Create
  | CreateSuccess
  | CreateFailure
  | Update
  | UpdateSuccess
  | UpdateFailure;
