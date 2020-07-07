import * as PostsActions from './posts.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from '../../models/post';
import { Action, createReducer, on } from '@ngrx/store';

export const featureKey = 'posts';

export interface PostsState extends EntityState<Post> {
  allPostsLoaded: boolean;
  loading: boolean
}

export const adapter = createEntityAdapter<Post>({
  sortComparer: (a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
});

export const initialState = adapter.getInitialState({
  allPostsLoaded: false,
  loading: false
});

export const postsReducer = createReducer(
  initialState,
  on(PostsActions.allPostsRequestedSuccess, (state, action) => adapter.addMany(action.posts, { ...state, allPostsLoaded: true })),
  on(PostsActions.newPostCreatedSuccess, (state, action) => adapter.addOne(action.post, { ...state })),
  on(PostsActions.startLoading, state => ({ ...state, loading: true })),
  on(PostsActions.endLoading, state => ({ ...state, loading: false }))
);

export function reducer(state: PostsState | undefined, action: Action) {
  return postsReducer(state, action);
}

export const {
  selectAll,
  selectEntities
} = adapter.getSelectors();
