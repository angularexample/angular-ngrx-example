import { createFeatureSelector, createSelector } from '@ngrx/store';
import { isPostsEqual } from './xxx-post-utilities';
import { xxxPostFeatureName, XxxPostState, XxxPostType } from './xxx-post-types';

export const selectPostState = createFeatureSelector<XxxPostState>(xxxPostFeatureName);

export const selectIsNoSelectedPost = createSelector(
  selectPostState,
  (state: XxxPostState) => state.selectedPostId === undefined
);

export const selectIsPostsLoading = createSelector(
  selectPostState,
  (state: XxxPostState) => state.isPostsLoading
);

export const selectPostForm = createSelector(
  selectPostState,
  (state: XxxPostState) => state.postForm
);

export const selectPosts = createSelector(
  selectPostState,
  (state: XxxPostState) => state.posts
);

export const selectSelectedPostId = createSelector(
  selectPostState,
  (state: XxxPostState) => state.selectedPostId
);

export const selectSelectedUserId = createSelector(
  selectPostState,
  (state: XxxPostState) => state.selectedUserId
);

export const selectIsNoSelectedUser = createSelector(
  selectSelectedUserId,
  (selectedUserId) => selectedUserId === undefined
);

export const selectIsPostsEmpty = createSelector(
  selectIsPostsLoading,
  selectPosts,
  (isLoading: boolean, posts: XxxPostType[]) => !isLoading && posts && posts.length === 0
);

export const selectIsPostsLoaded = createSelector(
  selectIsPostsLoading,
  selectPosts,
  (isLoading: boolean, posts: XxxPostType[]) => !isLoading && posts && posts.length > 0
);

export const selectSelectedPost = createSelector(
  selectPosts,
  selectSelectedPostId,
  (posts: XxxPostType[], postId: number | undefined) => {
    let post: XxxPostType | undefined = undefined;
    if (postId !== undefined && posts.length > 0) {
      post = posts.find(item => item.id === postId);
    }
    return post;
  }
);

export const selectIsSaveButtonDisabled = createSelector(
  selectIsPostsLoaded,
  selectSelectedPost,
  selectPostForm,
  (isPostsLoaded: boolean, selectedPost: XxxPostType | undefined, postForm: XxxPostType | undefined) => {
    const isPostFormEqual: boolean = isPostsEqual(selectedPost, postForm);
    return !isPostsLoaded || (selectedPost === undefined) || (postForm === undefined) || isPostFormEqual;
  }
);
