export interface XxxPostType {
  body: string;
  id: number;
  title: string;
  userId: number;
}
export const xxxPostFeatureName = 'xxxPost';

export const xxxPostInitialState: XxxPostState = {
  isPostsLoading: false,
  postForm: undefined,
  posts: [],
  selectedPostId: undefined,
  selectedUserId: undefined,
};

export interface XxxPostState {
  isPostsLoading: boolean;
  postForm?: XxxPostType;
  posts: XxxPostType[];
  selectedPostId?: number;
  selectedUserId?: number;
}
