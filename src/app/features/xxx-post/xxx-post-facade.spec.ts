import { mockPost1 } from './xxx-post.mocks';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { XxxPostFacade } from './xxx-post-facade';
import { xxxPostInitialState } from './xxx-post-types';
import { XxxUserFacade } from '../xxx-user/xxx-user-facade';
import { XxxPostActions } from './xxx-post-actions';

describe('XxxPostFacade', () => {
  let service: XxxPostFacade;
  let spyDispatch: jest.SpyInstance;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState: xxxPostInitialState }),
        XxxUserFacade
      ]
    });
    service = TestBed.inject(XxxPostFacade);
    store = TestBed.inject(MockStore);
    spyDispatch = jest.spyOn(store, 'dispatch');
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  describe('constructor phase', () => {
    it('should be created', () => {
      expect(service).toBeDefined();
    });

    it('should have isNoSelectedPost$', () => {
      expect(service.isNoSelectedPost$).toBeDefined();
    });

    it('should have isNoSelectedUser$', () => {
      expect(service.isNoSelectedUser$).toBeDefined();
    });

    it('should have isPostsEmpty$', () => {
      expect(service.isPostsEmpty$).toBeDefined();
    });

    it('should have isPostsLoaded$', () => {
      expect(service.isPostsLoaded$).toBeDefined();
    });

    it('should have isPostsLoading$', () => {
      expect(service.isPostsLoading$).toBeDefined();
    });

    it('should have isSaveButtonDisabled$', () => {
      expect(service.isSaveButtonDisabled$).toBeDefined();
    });

    it('should have posts$', () => {
      expect(service.posts$).toBeDefined();
    });

    it('should have selectedPost$', () => {
      expect(service.selectedPost$).toBeDefined();
    });

    it('should have selectedPostId$', () => {
      expect(service.selectedPostId$).toBeDefined();
    });

    it('should have selectedUserId$', () => {
      expect(service.selectedUserId$).toBeDefined();
    });
  });

  describe('setSelectedPostId', () => {
    it('should call dispatch setSelectedPostId', () => {
      service.setSelectedPostId(mockPost1.id);
      expect(spyDispatch).toHaveBeenCalledWith({ type: XxxPostActions.setSelectedPostId.type, postId: mockPost1.id });
    });
  });

  describe('setPostForm', () => {
    it('should call dispatch setPostForm', () => {
      service.setPostForm(mockPost1);
      expect(spyDispatch).toHaveBeenCalledWith({ type: XxxPostActions.setPostForm.type, post: mockPost1 });
    });
  });

  describe('showPosts', () => {
    it('should call dispatch showPosts', () => {
      service.showPosts();
      expect(spyDispatch).toHaveBeenCalledWith({ type: XxxPostActions.showPosts.type });
    });
  });

  describe('updatePost', () => {
    it('should call dispatch updatePost', () => {
      service.updatePost();
      expect(spyDispatch).toHaveBeenCalledWith({ type: XxxPostActions.updatePost.type });
    });
  });
});
