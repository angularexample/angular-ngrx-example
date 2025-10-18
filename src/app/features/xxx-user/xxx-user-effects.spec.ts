import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Component } from '@angular/core';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { mockXxxUserApiResponse } from './xxx-user.mocks';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideRouter, Route, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { XxxAlert } from '../../core/xxx-alert/xxx-alert';
import { XxxLoadingService } from '../../core/xxx-loading/xxx-loading-service';
import { XxxUserActions } from './xxx-user-actions';
import { XxxUserData } from './xxx-user-data';
import { XxxUserEffects } from './xxx-user-effects';
import { xxxUserInitialState } from './xxx-user-types';
import * as XxxUserSelectors from './xxx-user-selectors';

@Component({
  selector: 'xxx-dummy',
  template: ``
})
class XxxDummyComponent {
}

describe('XxxUserEffects', () => {
  let actions$: Observable<Action> = new Observable<Action>();
  let router: Router;
  let spyRouterNavigate: jest.SpyInstance;
  let service: XxxUserEffects;
  let store: MockStore;

  const mockRoutes: Route[] = [
    {
      path: '**',
      component: XxxDummyComponent
    }
  ];

  const mockXxxAlert = {
    showError: jest.fn()
  };

  const mockXxxLoadingService = {
    loadingOn: jest.fn(),
    loadingOff: jest.fn()
  };

  const mockUserData = {
    getUsers: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: xxxUserInitialState
        }),
        provideRouter(mockRoutes),
        { provide: XxxAlert, useValue: mockXxxAlert },
        { provide: XxxLoadingService, useValue: mockXxxLoadingService },
        { provide: XxxUserData, useValue: mockUserData },
        XxxUserEffects
      ]
    });
    actions$ = TestBed.inject(Actions);
    router = TestBed.inject(Router);
    service = TestBed.inject(XxxUserEffects);
    spyRouterNavigate = jest.spyOn(router, 'navigateByUrl');
    store = TestBed.inject(MockStore);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    store.resetSelectors();
  });

  describe('constructor phase', () => {
    it('should be created', () => {
      expect(service).toBeDefined();
    });
  });

  describe('getUsers$', () => {
    it('should run userData.getUsers', () => {
      jest.useFakeTimers();
      mockUserData.getUsers.mockReturnValue(of(mockXxxUserApiResponse));
      actions$ = of({ type: XxxUserActions.getUsers.type });
      service.getUsers$.subscribe(() => {
      });
      // Use runAllTimers to complete the observable subscription
      jest.runAllTimers();
      expect(mockUserData.getUsers).toHaveBeenCalled();
    });

    it('should return success action', () => {
      jest.useFakeTimers();
      let result: boolean = false;
      mockUserData.getUsers.mockReturnValue(of(mockXxxUserApiResponse));
      actions$ = of({ type: XxxUserActions.getUsers.type });
      service.getUsers$.subscribe((action) => {
        result = action.type === XxxUserActions.getUsersSuccess.type;
      });
      jest.runAllTimers();
      expect(result).toBe(true);
    });

    it('should return error action', () => {
      jest.useFakeTimers();
      let result: boolean = false;
      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({});
      mockUserData.getUsers.mockImplementation(() => throwError(() => httpErrorResponse));
      actions$ = of({ type: XxxUserActions.getUsers.type });
      service.getUsers$.subscribe((action) => {
        result = action.type === XxxUserActions.getUsersError.type;
      });
      jest.runAllTimers();
      expect(result).toBe(true);
    });
  });

  describe('getUsersError$', () => {
    it('should run loadingService.loadingOff', () => {
      jest.useFakeTimers();
      actions$ = of({ type: XxxUserActions.getUsersError.type });
      service.getUsersError$.subscribe();
      jest.runAllTimers();
      expect(mockXxxLoadingService.loadingOff).toHaveBeenCalled();
    });

    it('should run alertService.showError', () => {
      jest.useFakeTimers();
      actions$ = of({ type: XxxUserActions.getUsersError.type });
      service.getUsersError$.subscribe();
      jest.runAllTimers();
      expect(mockXxxAlert.showError).toHaveBeenCalled();
    });
  });

  describe('getUsersSuccess$', () => {
    it('should run loadingService.loadingOff', () => {
      jest.useFakeTimers();
      actions$ = of({ type: XxxUserActions.getUsersSuccess.type });
      service.getUsersSuccess$.subscribe();
      jest.runAllTimers();
      expect(mockXxxLoadingService.loadingOff).toHaveBeenCalled();
    });
  });

  describe('setSelectedUserId$', () => {
    it('should run router.navigateByUrl', () => {
      jest.useFakeTimers();
      actions$ = of({ type: XxxUserActions.setSelectedUserId.type });
      service.setSelectedUserId$.subscribe();
      jest.runAllTimers();
      expect(spyRouterNavigate).toHaveBeenCalledWith('/post');
    });
  });

  describe('showUsers$', () => {
    it('should return getUsers action when not loaded', () => {
      jest.useFakeTimers();
      let result: boolean = false;
      store.overrideSelector(XxxUserSelectors.selectIsUsersLoaded, false);
      store.refreshState();
      actions$ = of({ type: XxxUserActions.showUsers.type });
      service.showUsers$.subscribe((action) => {
        result = action.type === XxxUserActions.getUsers.type;
      });
      jest.runAllTimers();
      expect(result).toBe(true);
    });

    it('should not return getUsers action when loaded', () => {
      jest.useFakeTimers();
      let result: boolean = false;
      store.overrideSelector(XxxUserSelectors.selectIsUsersLoaded, true);
      store.refreshState();
      actions$ = of({ type: XxxUserActions.showUsers.type });
      service.showUsers$.subscribe((action) => {
        result = action.type === XxxUserActions.getUsers.type;
      });
      jest.runAllTimers();
      expect(result).toBe(false);
    });
  });
});
