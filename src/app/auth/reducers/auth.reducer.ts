import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { User } from '@firebase/auth-types';

export interface State {
  loggedIn: boolean;
  user: User | null;
}

export const initialState: State = {
  loggedIn: false,
  user: null
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {

    case AuthActionTypes.LoginSuccessAction: {
      return {
        ...state,
        user: action.payload.user,
        loggedIn: true
      };
    }

    case AuthActionTypes.LogoutAction: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
