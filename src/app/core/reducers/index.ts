import {
  ActionReducerMap,
  createSelector,
  MetaReducer
} from '@ngrx/store';
// import { storeFreeze } from 'ngrx-store-freeze';

import * as fromAuth from './auth.reducer';
import * as fromEntries from './entries.reducer';
import { environment } from 'environments/environment';

export interface State {
  auth: fromAuth.State;
  entries: fromEntries.State;
}

export const initialState: State = {
  auth: fromAuth.initialState,
  entries: fromEntries.initialState
};

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  entries: fromEntries.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const getAuthState = (state: State) => state.auth;

export const getLoggedIn = createSelector(
  getAuthState,
  fromAuth.getLoggedIn
);

export const getUser = createSelector(
  getAuthState,
  fromAuth.getUser
);

// export const getEntriesLoaded = createSelector(
//   getEntriesState,
//   fromEntries.getLoaded
// );

// export const getEntriesLoading = createSelector(
//   getEntriesState,
//   fromEntries.getLoading
// );

// export const getEntries = createSelector(
//   getEntriesState,
//   fromEntries.getEntries
// );
