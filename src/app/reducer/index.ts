import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { Params, RouterStateSnapshot } from '@angular/router';
import { ActionReducerMap } from '@ngrx/store';
import { Injectable } from '@angular/core';

export interface State {
  router: RouterReducerState<RouterStateUrl>;
}

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

@Injectable()
export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const {
      url,
      root: { queryParams }
    } = routerState;
    const { params } = route;
    return { url, params, queryParams }
  }
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
}
