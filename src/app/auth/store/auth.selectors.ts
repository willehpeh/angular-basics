import * as fromAuth from './auth.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(fromAuth.featureKey);

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  state => state.isLoggedIn
);

export const selectToken = createSelector(
  selectAuthState,
  state => state.token
);

export const selectLoginError = createSelector(
  selectAuthState,
  state => state.loginError
);

