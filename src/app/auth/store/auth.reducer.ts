import { Action, createReducer, on } from '@ngrx/store';

import * as LoginActions from './auth.actions';

export const featureKey = 'auth';

export interface AuthState {
  isLoggedIn: boolean;
  token: string;
  loginError: string;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  loginError: null
}

export const authReducer = createReducer(
  initialState,
  on(LoginActions.loginSuccess, (state, action) => ({ ...state, isLoggedIn: true, token: action.token, loginError: null })),
  on(LoginActions.loginFailure, (state, action) => ({ ...state, loginError: action.error })),
  on(LoginActions.logout, () => ({ ...initialState }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
