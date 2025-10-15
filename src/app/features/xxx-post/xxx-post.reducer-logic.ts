import { XxxPostType, xxxPostInitialState, XxxPostState } from './xxx-post-types';

export const getPosts = (state: XxxPostState) => {
  return {
    ...state,
    isPostsLoading: true,
    posts: [],
  }
}

export const getPostsError = (state: XxxPostState) => {
  return {
    ...state,
    isPostsLoading: false,
  }
}

export const getPostsSuccess = (state: XxxPostState, action: { posts: XxxPostType[] }) => {
  const posts: XxxPostType[] = <XxxPostType[]>JSON.parse(JSON.stringify(action.posts));
  return {
    ...state,
    isPostsLoading: false,
    posts,
  }
}

export const setPostForm = (state: XxxPostState, action: { post: XxxPostType }) => {
  const postForm: XxxPostType = <XxxPostType>JSON.parse(JSON.stringify(action.post));
  return {
    ...state,
    postForm
  }
}

export const setSelectedPostId = (state: XxxPostState, action: { postId: number }) => {
  const newState: XxxPostState = {
    ...state
  };
  // make sure the selected post exists
  if (state.posts.some((item: XxxPostType): boolean => item.id === action.postId)) {
    newState.selectedPostId = action.postId
    newState.postForm = undefined;
  }
  return newState;
}

export const setSelectedUserId = (_state: XxxPostState, action: {userId: number}) => {
  return {
    ...xxxPostInitialState,
    selectedUserId: action.userId,
  }
}

export const updatePostSuccess = (state: XxxPostState, action: {postResponse: XxxPostType}) => {
  // remove the old post, add the new one, sort by id
  const posts= state.posts.filter(item => item.id !== action.postResponse.id);
  const updatedPost: XxxPostType = {...action.postResponse};
  posts.push(updatedPost);
  posts.sort((a: XxxPostType, b: XxxPostType) => a.id - b.id);
  return {
    ...state,
    posts
  }
}
