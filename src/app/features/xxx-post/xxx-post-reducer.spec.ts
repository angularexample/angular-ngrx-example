import {
  mockPost2Edited,
  mockPosts,
  mockPostState,
  mockPostStateEdited,
  mockPostStateFormSame,
  mockPostStateLoading,
  mockPostStateSaved,
  mockPostStateSelected,
  mockPostStateSelectedUser,
  mockSelectedPost,
  mockSelectedUserId
} from './xxx-post.mocks';
import { XxxPostActions } from './xxx-post-actions';
import { xxxPostInitialState, XxxPostState } from './xxx-post-types';
import { xxxPostReducer } from './xxx-post-reducer';

describe('xxxPostReducer', () => {

  describe('getPosts', () => {
    it('should set loading true', () => {
      const startingState: XxxPostState = mockPostStateSelectedUser;
      const expectedState: XxxPostState = mockPostStateLoading;
      const result: XxxPostState = xxxPostReducer(startingState, XxxPostActions.getPosts());
      expect(result).toEqual(expectedState);
    });

    it('should empty posts', () => {
      const startingState: XxxPostState = mockPostState;
      const expectedState: XxxPostState = mockPostStateLoading;
      const result: XxxPostState = xxxPostReducer(startingState, XxxPostActions.getPosts());
      expect(result).toEqual(expectedState);
    });
  });

  describe('getPostsError', () => {
    it('should set loading false', () => {
      const startingState: XxxPostState = mockPostStateLoading;
      const expectedState: XxxPostState = {
        ...mockPostStateLoading,
        isPostsLoading: false
      };
      const result: XxxPostState = xxxPostReducer(startingState, XxxPostActions.getPostsError());
      expect(result).toEqual(expectedState);
    });
  });

  describe('getPostsSuccess', () => {
    it('should set loading false and set posts', () => {
      const startingState: XxxPostState = mockPostStateLoading;
      const expectedState: XxxPostState = mockPostState;
      const result: XxxPostState = xxxPostReducer(startingState, XxxPostActions.getPostsSuccess({ posts: mockPosts }));
      expect(result).toEqual(expectedState);
    });
  });

  describe('setPostForm', () => {
    it('should set selected post id', () => {
      const startingState: XxxPostState = mockPostStateSelected;
      const expectedState: XxxPostState = mockPostStateFormSame;
      const result: XxxPostState = xxxPostReducer(startingState, XxxPostActions.setPostForm({ post: mockSelectedPost }));
      expect(result).toEqual(expectedState);
    });
  });

  describe('setSelectedPostId', () => {
    it('should set selected post id', () => {
      const startingState: XxxPostState = mockPostState;
      const expectedState: XxxPostState = mockPostStateSelected;
      const result: XxxPostState = xxxPostReducer(startingState, XxxPostActions.setSelectedPostId({ postId: mockSelectedPost.id }));
      expect(result).toEqual(expectedState);
    });
  });

  describe('setSelectedUserId', () => {
    it('should set selectedUserId', () => {
      const startingState: XxxPostState = xxxPostInitialState;
      const expectedState: XxxPostState = mockPostStateSelectedUser;
      const result: XxxPostState = xxxPostReducer(startingState, XxxPostActions.setSelectedUserId({ userId: mockSelectedUserId }));
      expect(result).toEqual(expectedState);
    });
  });

  describe('updatePostSuccess', () => {
    it('should replace selectedPost with given postResponse', () => {
      const startingState: XxxPostState = mockPostStateEdited;
      const expectedState: XxxPostState = mockPostStateSaved;
      const result: XxxPostState = xxxPostReducer(startingState, XxxPostActions.updatePostSuccess({ postResponse: mockPost2Edited }));
      expect(result).toEqual(expectedState);
    });
  });
});
