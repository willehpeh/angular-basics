import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] Login',
  props<{ username: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Auth API] Login Success',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[Auth API] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction(
  '[App Header] Logout'
);

export const checkTokenInStorage = createAction(
  '[App Component] Check token in Storage'
);
