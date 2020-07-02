import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, interval, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, filter, map, pluck, share, take, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from './auth/store/auth.selectors';

import * as LoginActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // interval$: Observable<number>;
  title$: Observable<string>;
  title: string;

  isLoggedIn$: Observable<boolean>;

  constructor(private router: Router,
              private store: Store) {}

  ngOnInit() {
    // this.interval$ = interval(1000).pipe(
    //   take(3),
    // );
    // this.title = 'Mon titre !'
    // this.title$ = interval(1000).pipe(
    //   map(value => ({
    //     value,
    //     messages: {
    //       message: 'Mon titre n° ' + value
    //     }
    //   })),
    //   filter(valueObj => valueObj.value % 2 === 0),
    //   pluck('messages', 'message')
    // );
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.store.dispatch(LoginActions.checkTokenInStorage());
  }

  onNewPost() {
    this.router.navigateByUrl('posts/new');
    // this.router.navigate(['posts', 'new']);
  }

  onLogout() {
    this.store.dispatch(LoginActions.logout());
  }

}
