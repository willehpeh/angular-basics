import * as fromPosts from './posts.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.reducer';

export const selectPostsState = createFeatureSelector<PostsState>(fromPosts.featureKey);

export const selectAllPosts = createSelector(
  selectPostsState,
  fromPosts.selectAll
);

export const selectPostById = createSelector(
  selectPostsState,
  (state, id: string) => fromPosts.selectEntities[id]
);

export const selectAllPostsLoaded = createSelector(
  selectPostsState,
  state => state.allPostsLoaded
);

export const selectPostsLoading = createSelector(
  selectPostsState,
  state => state.loading
);
