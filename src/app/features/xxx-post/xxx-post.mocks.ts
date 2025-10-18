import { XxxPostState, XxxPostType } from './xxx-post-types';

export const mockSelectedUserId = 1;

export const mockPost1: XxxPostType = {
  body: 'mockBody1',
  id: 1,
  title: 'mockTitle1',
  userId: mockSelectedUserId,
};

export const mockPost2: XxxPostType = {
  body: 'mockBody2',
  id: 2,
  title: 'mockTitle2',
  userId: mockSelectedUserId,
};

export const mockPost2Edited: XxxPostType = {
  body: 'mockBody2',
  id: 2,
  title: 'mockTitle2 edited',
  userId: mockSelectedUserId,
};

export const mockPost3: XxxPostType = {
  body: 'mockBody3',
  id: 3,
  title: 'mockTitle3',
  userId: mockSelectedUserId,
};

export const mockPosts: XxxPostType[] = [mockPost1, mockPost2, mockPost3];

export const mockPostsSaved: XxxPostType[] = [mockPost1, mockPost2Edited, mockPost3];

export const mockPostStateSelectedUser: XxxPostState = {
  isPostsLoading: false,
  postForm: undefined,
  posts: [],
  selectedPostId: undefined,
  selectedUserId: mockSelectedUserId,
}

export const mockPostState: XxxPostState = {
  isPostsLoading: false,
  postForm: undefined,
  posts: mockPosts,
  selectedPostId: undefined,
  selectedUserId: mockSelectedUserId,
}

export const mockPostStateLoading: XxxPostState = {
  isPostsLoading: true,
  postForm: undefined,
  posts: [],
  selectedPostId: undefined,
  selectedUserId: mockSelectedUserId,
}

export const mockSelectedPostId = 2;

export const mockSelectedPost: XxxPostType = mockPost2;

export const mockPostStateSelected: XxxPostState = {
  isPostsLoading: false,
  postForm: undefined,
  posts: mockPosts,
  selectedPostId: mockSelectedPostId,
  selectedUserId: mockSelectedUserId,
}

export const mockPostStateFormSame: XxxPostState = {
  isPostsLoading: false,
  postForm: mockPost2,
  posts: mockPosts,
  selectedPostId: mockSelectedPostId,
  selectedUserId: mockSelectedUserId,
}

export const mockPostStateEdited: XxxPostState = {
  isPostsLoading: false,
  postForm: mockPost2Edited,
  posts: mockPosts,
  selectedPostId: mockSelectedPostId,
  selectedUserId: mockSelectedUserId,
}

export const mockPostStateSaved: XxxPostState = {
  isPostsLoading: false,
  postForm: mockPost2Edited,
  posts: mockPostsSaved,
  selectedPostId: mockSelectedPostId,
  selectedUserId: mockSelectedUserId,
}
