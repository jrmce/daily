import {
  ActionReducerMap,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromAuth from './auth.reducer';
import { environment } from 'environments/environment';

export interface State {
  auth: fromAuth.State;
}

export const initialState: State = {
  auth: fromAuth.initialState
};

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
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
