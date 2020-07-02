import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as LoginActions from '../auth/store/auth.actions';
import { concatMap, filter, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RootEffects {

  checkTokenInStorage$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.checkTokenInStorage),
    concatMap(() => of(localStorage.getItem('token'))),
    filter(token => !!token),
    concatMap(token => this.auth.checkToken(token).pipe(
      map(() => LoginActions.loginSuccess({ token }))
    ))
  ));

  constructor(private actions$: Actions,
              private auth: AuthService) {
  }
}
