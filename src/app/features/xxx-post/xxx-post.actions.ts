import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { XxxPostType, xxxPostFeatureName } from './xxx-post-types';

export const XxxPostActions = createActionGroup({
  source: xxxPostFeatureName,
  events: {
    'getPosts': emptyProps(),
    'getPostsError': emptyProps(),
    'getPostsSuccess': props<{ posts: XxxPostType[] }>(),
    'setPostForm': props<{ post: XxxPostType }>(),
    'setSelectedPostId': props<{ postId: number }>(),
    'setSelectedUserId': props<{ userId: number }>(),
    'showPosts': emptyProps(),
    'updatePost': emptyProps(),
    'updatePostError': emptyProps(),
    'updatePostSuccess': props<{ postResponse: XxxPostType }>(),
  },
});
