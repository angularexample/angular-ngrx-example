import * as XxxPostSelectors from './xxx-post-selectors';
import { XxxPostType } from './xxx-post-types';
import {
  mockPost1,
  mockPost2,
  mockPosts,
  mockPostState,
  mockPostStateFormSame,
  mockPostStateLoading,
  mockPostStateSelected,
  mockSelectedPost,
  mockSelectedPostId,
  mockSelectedUserId
} from './xxx-post.mocks';

describe('xxx-post-selectors', () => {

  describe('selectIsNoSelectedPost', () => {
    it('should return true when no selectedPostId', () => {
      const result: unknown = XxxPostSelectors.selectIsNoSelectedPost.projector(mockPostState);
      expect(result).toBe(true);
    });

    it('should return false when there is a selectedPostId', () => {
      const result: unknown = XxxPostSelectors.selectIsNoSelectedPost.projector(mockPostStateSelected);
      expect(result).toBe(false);
    });
  });

  describe('selectIsPostsLoading', () => {
    it('should return true when isPostsLoading is true', () => {
      const result: unknown = XxxPostSelectors.selectIsPostsLoading.projector(mockPostStateLoading);
      expect(result).toBe(true);
    });

    it('should return false when isPostsLoading is false', () => {
      const result: unknown = XxxPostSelectors.selectIsPostsLoading.projector(mockPostState);
      expect(result).toBe(false);
    });
  });

  describe('selectPostForm', () => {
    it('should return postForm', () => {
      const expectedResult: XxxPostType = mockPost2;
      const result: unknown = XxxPostSelectors.selectPostForm.projector(mockPostStateFormSame);
      expect(result).toBe(expectedResult);
    });
  });

  describe('selectPosts', () => {
    it('should return posts', () => {
      const expectedResult: XxxPostType[] = mockPosts;
      const result: unknown = XxxPostSelectors.selectPosts.projector(mockPostState);
      expect(result).toBe(expectedResult);
    });
  });

  describe('selectSelectedPostId', () => {
    it('should return selectedPostId', () => {
      const expectedResult: number | undefined = mockSelectedPostId;
      const result: unknown = XxxPostSelectors.selectSelectedPostId.projector(mockPostStateSelected);
      expect(result).toBe(expectedResult);
    });

    it('should return undefined when there is no selectedPostId', () => {
      const expectedResult: number | undefined = undefined;
      const result: unknown = XxxPostSelectors.selectSelectedPostId.projector(mockPostState);
      expect(result).toBe(expectedResult);
    });
  });

  describe('selectSelectedUserId', () => {
    it('should return selectedUserId', () => {
      const expectedResult: number = mockSelectedUserId;
      const result: unknown = XxxPostSelectors.selectSelectedUserId.projector(mockPostState);
      expect(result).toBe(expectedResult);
    });
  });

  describe('selectIsNoSelectedUser', () => {
    it('should return true when there is no selectedUserId', () => {
      const result: unknown = XxxPostSelectors.selectIsNoSelectedUser.projector(undefined);
      expect(result).toBe(true);
    });

    it('should return false when there is a selectedUserId', () => {
      const result: unknown = XxxPostSelectors.selectIsNoSelectedUser.projector(mockSelectedUserId);
      expect(result).toBe(false);
    });
  });

  describe('selectIsPostsEmpty', () => {
    it('should return true when not loading and posts is empty', () => {
      const result: unknown = XxxPostSelectors.selectIsPostsEmpty.projector(false, []);
      expect(result).toBe(true);
    });

    it('should return false when loading and posts is empty', () => {
      const result: unknown = XxxPostSelectors.selectIsPostsEmpty.projector(true, []);
      expect(result).toBe(false);
    });

    it('should return false when not loading and posts is not empty', () => {
      const result: unknown = XxxPostSelectors.selectIsPostsEmpty.projector(false, mockPosts);
      expect(result).toBe(false);
    });

    it('should return false when loading and posts is not empty', () => {
      const result: unknown = XxxPostSelectors.selectIsPostsEmpty.projector(true, mockPosts);
      expect(result).toBe(false);
    });
  });

  describe('selectIsPostsLoaded', () => {
    it('should return false when not loading and posts is empty', () => {
      const result: unknown = XxxPostSelectors.selectIsPostsLoaded.projector(false, []);
      expect(result).toBe(false);
    });

    it('should return false when loading and posts is empty', () => {
      const result: unknown = XxxPostSelectors.selectIsPostsLoaded.projector(true, []);
      expect(result).toBe(false);
    });

    it('should return true when not loading and posts is not empty', () => {
      const result: unknown = XxxPostSelectors.selectIsPostsLoaded.projector(false, mockPosts);
      expect(result).toBe(true);
    });

    it('should return false when loading and posts is not empty', () => {
      const result: unknown = XxxPostSelectors.selectIsPostsLoaded.projector(true, mockPosts);
      expect(result).toBe(false);
    });
  });

  describe('selectSelectedPost', () => {
    it('should return post matching selectedPostId', () => {
      const expectedResult: XxxPostType = mockSelectedPost;
      const result: unknown = XxxPostSelectors.selectSelectedPost.projector(mockPosts, mockSelectedPostId);
      expect(result).toBe(expectedResult);
    });

    it('should return undefined when no post matches selectedUserId', () => {
      const result: unknown = XxxPostSelectors.selectSelectedPost.projector(mockPosts, 0);
      expect(result).toBeUndefined();
    });

    it('should return undefined when posts are empty', () => {
      const result: unknown = XxxPostSelectors.selectSelectedPost.projector([], mockSelectedPostId);
      expect(result).toBeUndefined();
    });

    it('should return undefined when there is no selectedPostId', () => {
      const result: unknown = XxxPostSelectors.selectSelectedPost.projector(mockPosts, undefined);
      expect(result).toBeUndefined();
    });
  });

  describe('selectIsSaveButtonDisabled', () => {
    it('should return true when not loaded and no selectedPost and no postForm', () => {
      const result: unknown = XxxPostSelectors.selectIsSaveButtonDisabled.projector(false, undefined, undefined);
      expect(result).toBe(true);
    });

    it('should return true when loaded and no selectedPost and no postForm', () => {
      const result: unknown = XxxPostSelectors.selectIsSaveButtonDisabled.projector(true, undefined, undefined);
      expect(result).toBe(true);
    });

    it('should return true when not loaded and selectedPost and no postForm', () => {
      const result: unknown = XxxPostSelectors.selectIsSaveButtonDisabled.projector(false, mockPost1, undefined);
      expect(result).toBe(true);
    });

    it('should return true when loaded and selectedPost and no postForm', () => {
      const result: unknown = XxxPostSelectors.selectIsSaveButtonDisabled.projector(true, mockPost1, undefined);
      expect(result).toBe(true);
    });

    it('should return true when not loaded and selectedPost equals postForm', () => {
      const result: unknown = XxxPostSelectors.selectIsSaveButtonDisabled.projector(false, mockPost1, mockPost1);
      expect(result).toBe(true);
    });

    it('should return true when loaded and selectedPost equals postForm', () => {
      const result: unknown = XxxPostSelectors.selectIsSaveButtonDisabled.projector(true, mockPost1, mockPost1);
      expect(result).toBe(true);
    });
    it('should return true when not loaded and selectedPost not equals postForm', () => {
      const result: unknown = XxxPostSelectors.selectIsSaveButtonDisabled.projector(false, mockPost1, mockPost2);
      expect(result).toBe(true);
    });

    it('should return false when loaded and selectedPost not equals postForm', () => {
      const result: unknown = XxxPostSelectors.selectIsSaveButtonDisabled.projector(true, mockPost1, mockPost2);
      expect(result).toBe(false);
    });
  });
});
