import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as LoginActions from './auth.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.login),
    exhaustMap(action => this.auth.login(action.username, action.password).pipe(
      map((data: { token: string }) => LoginActions.loginSuccess({ token: data.token })),
      catchError(error => of(LoginActions.loginFailure({ error })))
    ))
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.loginSuccess),
    tap(action => localStorage.setItem('token', action.token)),
    tap(() => this.router.navigateByUrl('posts'))
  ), { dispatch: false });

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.logout),
    tap(() => localStorage.clear()),
    tap(() => this.router.navigateByUrl('login'))
  ), { dispatch: false })

  constructor(private auth: AuthService,
              private actions$: Actions,
              private router: Router) {
  }
}
