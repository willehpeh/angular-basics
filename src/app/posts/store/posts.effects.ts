import { Injectable } from '@angular/core';

import * as PostsActions from './posts.actions';
import { PostsService } from '../../services/posts.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectAllPostsLoaded } from './posts.selectors';
import { endLoading, newPostCreatedFailure, newPostCreatedSuccess, startLoading } from './posts.actions';
import { of } from 'rxjs';
import { Post } from '../../models/post';
import { Router } from '@angular/router';

@Injectable()
export class PostsEffects {

  allPostsRequested$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.allPostsRequested),
    withLatestFrom(this.store.select(selectAllPostsLoaded)),
    filter(([ action, loaded ]) => !loaded),
    // mergeMap(() => this.store.select(selectAllPostsLoaded)),
    // filter(loaded => !loaded),
    mergeMap(([ action, loaded ]) => this.postsService.getPosts().pipe(
      map(posts => PostsActions.allPostsRequestedSuccess({ posts }))
    ))
  ));

  newPostCreated$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.newPostCreated),
    tap(() => this.store.dispatch(startLoading())),
    mergeMap(action => this.postsService.addPost(action.post).pipe(
      map(post => newPostCreatedSuccess({ post })),
      catchError((error: string) => of(newPostCreatedFailure({ error })))
    ))
  ));

  newPostCreatedSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.newPostCreatedSuccess),
    tap(() => this.router.navigateByUrl('posts'))
  ), { dispatch: false });

  endLoading$ = createEffect(() => this.actions$.pipe(
    ofType(
      PostsActions.newPostCreatedSuccess,
      PostsActions.newPostCreatedFailure),
    tap(() => this.store.dispatch(endLoading()))
  ), { dispatch: false });

  constructor(private postsService: PostsService,
              private actions$: Actions,
              private store: Store,
              private router: Router) {
  }
}
