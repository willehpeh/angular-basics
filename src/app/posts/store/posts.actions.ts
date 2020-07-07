import { createAction, props } from '@ngrx/store';
import { Post } from '../../models/post';

export const allPostsRequested = createAction(
  '[Posts List] All Posts Requested'
);

export const allPostsRequestedSuccess = createAction(
  '[Posts API] All Posts Requested Success',
  props<{ posts: Post[] }>()
);

export const newPostCreated = createAction(
  '[New Post Form] New Post Created',
  props<{ post: Post }>()
);

export const newPostCreatedSuccess = createAction(
  '[Posts API] New Post Created Success',
  props<{ post: Post }>()
);

export const newPostCreatedFailure = createAction(
  '[Posts API] New Post Created Failure',
  props<{ error: string }>()
);

export const startLoading = createAction(
  '[Post Effects] Start Loading'
);

export const endLoading = createAction(
  '[Posts Effects] End Loading'
);
