import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, interval, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, filter, map, pluck, share, take, takeUntil, tap, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // interval$: Observable<number>;
  title$: Observable<string>;
  title: string;

  constructor(private router: Router) {}

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
  }

  onNewPost() {
    this.router.navigateByUrl('posts/new');
    // this.router.navigate(['posts', 'new']);
  }

}
