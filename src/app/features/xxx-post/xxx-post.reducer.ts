import { createReducer, on } from '@ngrx/store';
import { XxxPostActions } from './xxx-post.actions';
import { xxxPostInitialState } from './xxx-post-types';
import * as XxxPostReducerLogic from './xxx-post.reducer-logic';

export const xxxPostReducer = createReducer(
  xxxPostInitialState,
  on(XxxPostActions.getPosts, XxxPostReducerLogic.getPosts),
  on(XxxPostActions.getPostsError, XxxPostReducerLogic.getPostsError),
  on(XxxPostActions.getPostsSuccess, XxxPostReducerLogic.getPostsSuccess),
  on(XxxPostActions.setPostForm, XxxPostReducerLogic.setPostForm),
  on(XxxPostActions.setSelectedPostId, XxxPostReducerLogic.setSelectedPostId),
  on(XxxPostActions.setSelectedUserId, XxxPostReducerLogic.setSelectedUserId),
  on(XxxPostActions.updatePostSuccess, XxxPostReducerLogic.updatePostSuccess),
);
