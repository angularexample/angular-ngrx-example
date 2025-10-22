import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Component } from '@angular/core';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { mockPost2Edited, mockPosts, mockSelectedUserId } from './xxx-post.mocks';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideRouter, Route, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { XxxAlert } from '../../core/xxx-alert/xxx-alert';
import { XxxLoadingService } from '../../core/xxx-loading/xxx-loading-service';
import { XxxPostActions } from './xxx-post-actions';
import { XxxPostData } from './xxx-post-data';
import { XxxPostEffects } from './xxx-post-effects';
import { xxxPostInitialState } from './xxx-post-types';
import * as XxxPostSelectors from './xxx-post-selectors';
import * as XxxUserSelectors from '../xxx-user/xxx-user-selectors';

@Component({
  selector: 'xxx-dummy',
  template: ``
})
class XxxDummyComponent {
}

describe('XxxPostEffects', () => {
  let actions$: Observable<Action> = new Observable<Action>();
  let router: Router;
  let spyRouterNavigate: jest.SpyInstance;
  let service: XxxPostEffects;
  let store: MockStore;

  const mockRoutes: Route[] = [
    {
      path: '**',
      component: XxxDummyComponent
    }
  ];

  const mockXxxAlert = {
    showError: jest.fn(),
    showInfo: jest.fn()
  };

  const mockXxxLoadingService = {
    loadingOn: jest.fn(),
    loadingOff: jest.fn()
  };

  const mockPostData = {
    getPosts: jest.fn().mockReturnValue(of(mockPosts)),
    updatePost: jest.fn().mockReturnValue(of(mockPost2Edited))
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: xxxPostInitialState
        }),
        provideRouter(mockRoutes),
        { provide: XxxAlert, useValue: mockXxxAlert },
        { provide: XxxLoadingService, useValue: mockXxxLoadingService },
        { provide: XxxPostData, useValue: mockPostData },
        XxxPostEffects
      ]
    });
    actions$ = TestBed.inject(Actions);
    router = TestBed.inject(Router);
    service = TestBed.inject(XxxPostEffects);
    spyRouterNavigate = jest.spyOn(router, 'navigateByUrl');
    store = TestBed.inject(MockStore);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    store.resetSelectors();
    mockPostData.updatePost.mockReturnValue(of(mockPost2Edited));
  });

  describe('constructor phase', () => {
    it('should be created', () => {
      expect(service).toBeDefined();
    });
  });

  describe('getPosts$', () => {
    it('should run postData.getPosts', () => {
      jest.useFakeTimers(); // Required for runAllTimers
      store.overrideSelector(XxxPostSelectors.selectSelectedUserId, mockSelectedUserId);
      store.refreshState(); // To trigger the selector
      actions$ = of({ type: XxxPostActions.getPosts.type });
      service.getPosts$.subscribe();
      // Use runAllTimers in a zoneless app to complete the observable subscription
      jest.runAllTimers();
      expect(mockPostData.getPosts).toHaveBeenCalled();
    });

    it('should run loadingService.loadingOn', () => {
      jest.useFakeTimers();
      store.overrideSelector(XxxPostSelectors.selectSelectedUserId, mockSelectedUserId);
      store.refreshState();
      actions$ = of({ type: XxxPostActions.getPosts.type });
      service.getPosts$.subscribe();
      jest.runAllTimers();
      expect(mockXxxLoadingService.loadingOn).toHaveBeenCalled();
    });

    it('should return success action', () => {
      jest.useFakeTimers();
      store.overrideSelector(XxxPostSelectors.selectSelectedUserId, mockSelectedUserId);
      store.refreshState();
      let result: boolean = false;
      actions$ = of({ type: XxxPostActions.getPosts.type });
      service.getPosts$.subscribe((action) => {
        result = action.type === XxxPostActions.getPostsSuccess.type;
      });
      jest.runAllTimers();
      expect(result).toBe(true);
    });

    it('should return error action', () => {
      jest.useFakeTimers();
      store.overrideSelector(XxxPostSelectors.selectSelectedUserId, mockSelectedUserId);
      store.refreshState();
      let result: boolean = false;
      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({});
      mockPostData.getPosts.mockImplementation(() => throwError(() => httpErrorResponse));
      actions$ = of({ type: XxxPostActions.getPosts.type });
      service.getPosts$.subscribe((action) => {
        result = action.type === XxxPostActions.getPostsError.type;
      });
      jest.runAllTimers();
      expect(result).toBe(true);
    });

    it('should not call getPosts when undefined userId', () => {
      jest.useFakeTimers();
      store.overrideSelector(XxxPostSelectors.selectSelectedUserId, undefined);
      store.refreshState();
      actions$ = of({ type: XxxPostActions.getPosts.type });
      service.getPosts$.subscribe();
      jest.runAllTimers();
      expect(mockPostData.getPosts).not.toHaveBeenCalled();
    });

    it('should return error action when undefined userId', () => {
      jest.useFakeTimers();
      store.overrideSelector(XxxPostSelectors.selectSelectedUserId, undefined);
      store.refreshState();
      let result: boolean = false;
      actions$ = of({ type: XxxPostActions.getPosts.type });
      service.getPosts$.subscribe((action) => {
        result = action.type === XxxPostActions.getPostsError.type;
      });
      jest.runAllTimers();
      expect(result).toBe(true);
    });
  });

  describe('getPostsError$', () => {
    it('should run loadingService.loadingOff', () => {
      jest.useFakeTimers();
      actions$ = of({ type: XxxPostActions.getPostsError.type });
      service.getPostsError$.subscribe();
      jest.runAllTimers();
      expect(mockXxxLoadingService.loadingOff).toHaveBeenCalled();
    });

    it('should run alertService.showError', () => {
      jest.useFakeTimers();
      actions$ = of({ type: XxxPostActions.getPostsError.type });
      service.getPostsError$.subscribe();
      jest.runAllTimers();
      expect(mockXxxAlert.showError).toHaveBeenCalledWith('Error occurred getting posts. Please try again later.');
    });
  });

  describe('getPostsSuccess$', () => {
    it('should run loadingService.loadingOff', () => {
      jest.useFakeTimers();
      actions$ = of({ type: XxxPostActions.getPostsSuccess.type });
      service.getPostsSuccess$.subscribe();
      jest.runAllTimers();
      expect(mockXxxLoadingService.loadingOff).toHaveBeenCalled();
    });
  });

  describe('setSelectedPostId$', () => {
    it('should run router.navigateByUrl', () => {
      jest.useFakeTimers();
      actions$ = of({ type: XxxPostActions.setSelectedPostId.type });
      service.setSelectedPostId$.subscribe();
      jest.runAllTimers();
      expect(spyRouterNavigate).toHaveBeenCalledWith('/post/edit');
    });
  });

  describe('setSelectedUserId$', () => {
    xit('should run return action getPosts', () => {
      jest.useFakeTimers();
      let result: unknown;
      actions$ = of({ type: XxxPostActions.setSelectedUserId.type });
      service.setSelectedPostId$.subscribe((action) => {
        result = action;
      });
      jest.runAllTimers();
      expect(result).toBeDefined();
    });
  });

  describe('showPosts$', () => {
    it('should return getPosts action when not loaded and userIds are the same', () => {
      jest.useFakeTimers();
      let result: boolean = false;
      store.overrideSelector(XxxPostSelectors.selectIsPostsLoaded, false);
      store.overrideSelector(XxxPostSelectors.selectSelectedUserId, 1);
      store.overrideSelector(XxxUserSelectors.selectSelectedUserId, 1);
      store.refreshState();
      actions$ = of({ type: XxxPostActions.showPosts.type });
      service.showPosts$.subscribe((action) => {
        result = action.type === XxxPostActions.getPosts.type;
      });
      jest.runAllTimers();
      expect(result).toBe(true);
    });

    it('should return setSelectedUserId action when loaded and userIds are not the same', () => {
      jest.useFakeTimers();
      let result: boolean = false;
      store.overrideSelector(XxxPostSelectors.selectIsPostsLoaded, true);
      store.overrideSelector(XxxPostSelectors.selectSelectedUserId, 1);
      store.overrideSelector(XxxUserSelectors.selectSelectedUserId, 2);
      store.refreshState();
      actions$ = of({ type: XxxPostActions.showPosts.type });
      service.showPosts$.subscribe((action) => {
        result = action.type === XxxPostActions.setSelectedUserId.type;
      });
      jest.runAllTimers();
      expect(result).toBe(true);
    });

    it('should not return any action when loaded and userIds are the same', () => {
      jest.useFakeTimers();
      let result: unknown;
      store.overrideSelector(XxxPostSelectors.selectIsPostsLoaded, true);
      store.overrideSelector(XxxPostSelectors.selectSelectedUserId, 1);
      store.overrideSelector(XxxUserSelectors.selectSelectedUserId, 1);
      store.refreshState();
      actions$ = of({ type: XxxPostActions.showPosts.type });
      service.showPosts$.subscribe((action) => {
        result = action;
      });
      jest.runAllTimers();
      expect(result).toBeUndefined();
    });
  });

  describe('updatePost$', () => {
    it('should run xxxPostData.updatePost when postForm exists', () => {
      jest.useFakeTimers();
      store.overrideSelector(XxxPostSelectors.selectPostForm, mockPost2Edited);
      store.refreshState();
      actions$ = of({ type: XxxPostActions.updatePost.type });
      service.updatePost$.subscribe();
      jest.runAllTimers();
      expect(mockPostData.updatePost).toHaveBeenCalledWith(mockPost2Edited);
    });

    it('should not run xxxPostData.updatePost when postForm does not exiss', () => {
      jest.useFakeTimers();
      store.overrideSelector(XxxPostSelectors.selectPostForm, undefined);
      store.refreshState();
      actions$ = of({ type: XxxPostActions.updatePost.type });
      service.updatePost$.subscribe();
      jest.runAllTimers();
      expect(mockPostData.updatePost).not.toHaveBeenCalled();
    });

    it('should return updatePostError action when postForm does not exiss', () => {
      jest.useFakeTimers();
      let result: boolean = false;
      store.overrideSelector(XxxPostSelectors.selectPostForm, undefined);
      store.refreshState();
      actions$ = of({ type: XxxPostActions.updatePost.type });
      service.updatePost$.subscribe((action) => {
        result = action.type === XxxPostActions.updatePostError.type;
      });
      jest.runAllTimers();
      expect(result).toBe(true);
    });

    it('should return error action', () => {
      jest.useFakeTimers();
      store.overrideSelector(XxxPostSelectors.selectPostForm, mockPost2Edited);
      store.refreshState();
      let result: boolean = false;
      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({});
      mockPostData.updatePost.mockImplementation(() => throwError(() => httpErrorResponse));
      actions$ = of({ type: XxxPostActions.updatePost.type });
      service.updatePost$.subscribe((action) => {
        result = action.type === XxxPostActions.updatePostError.type;
      });
      jest.runAllTimers();
      expect(result).toBe(true);
    });

    it('should return success action', () => {
      jest.useFakeTimers();
      store.overrideSelector(XxxPostSelectors.selectPostForm, mockPost2Edited);
      store.refreshState();
      let result: boolean = false;
      actions$ = of({ type: XxxPostActions.updatePost.type });
      service.updatePost$.subscribe((action) => {
        result = action.type === XxxPostActions.updatePostSuccess.type;
      });
      jest.runAllTimers();
      expect(result).toBe(true);
    });

    it('should run loadingService.loadingOn', () => {
      jest.useFakeTimers();
      store.overrideSelector(XxxPostSelectors.selectPostForm, mockPost2Edited);
      store.refreshState();
      actions$ = of({ type: XxxPostActions.updatePost.type });
      service.updatePost$.subscribe();
      jest.runAllTimers();
      expect(mockXxxLoadingService.loadingOn).toHaveBeenCalled();
    });
  });

  describe('updatePostError$', () => {
    it('should run loadingService.loadingOff', () => {
      jest.useFakeTimers();
      actions$ = of({ type: XxxPostActions.updatePostError.type });
      service.updatePostError$.subscribe();
      jest.runAllTimers();
      expect(mockXxxLoadingService.loadingOff).toHaveBeenCalled();
    });

    it('should run alertService.showError', () => {
      jest.useFakeTimers();
      actions$ = of({ type: XxxPostActions.updatePostError.type });
      service.updatePostError$.subscribe();
      jest.runAllTimers();
      expect(mockXxxAlert.showError).toHaveBeenCalledWith('Error occurred during post update. Please try again later.');
    });

    it('should run loadingService.loadingOff', () => {
      jest.useFakeTimers();
      actions$ = of({ type: XxxPostActions.updatePostError.type });
      service.updatePostError$.subscribe();
      jest.runAllTimers();
      expect(mockXxxLoadingService.loadingOff).toHaveBeenCalled();
    });
  });

  describe('updatePostSuccess$', () => {
    it('should run loadingService.loadingOff', () => {
      jest.useFakeTimers();
      store.overrideSelector(XxxPostSelectors.selectSelectedPostId, mockPost2Edited.id);
      store.refreshState();
      actions$ = of({ type: XxxPostActions.updatePostSuccess.type });
      service.updatePostSuccess$.subscribe();
      jest.runAllTimers();
      expect(mockXxxLoadingService.loadingOff).toHaveBeenCalled();
    });

    it('should run xxxAlert.showInfo', () => {
      const postId: number = mockPost2Edited.id;
      jest.useFakeTimers();
      store.overrideSelector(XxxPostSelectors.selectSelectedPostId, mockPost2Edited.id);
      store.refreshState();
      actions$ = of({ type: XxxPostActions.updatePostSuccess.type });
      service.updatePostSuccess$.subscribe();
      jest.runAllTimers();
      expect(mockXxxAlert.showInfo).toHaveBeenCalledWith(`Successfully updated post: ${postId}`);
    });

    it('should run router.navigateByUrl', () => {
      jest.useFakeTimers();
      store.overrideSelector(XxxPostSelectors.selectSelectedPostId, mockPost2Edited.id);
      store.refreshState();
      actions$ = of({ type: XxxPostActions.updatePostSuccess.type });
      service.updatePostSuccess$.subscribe();
      jest.runAllTimers();
      expect(spyRouterNavigate).toHaveBeenCalledWith('/post');
    });
  });
});
