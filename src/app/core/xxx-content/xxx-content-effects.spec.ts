import { Action, createSelector } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { mockContentHomeApi } from './xxx-content.mocks';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { XxxContentActions } from './xxx-content-actions';
import { XxxContentData } from './xxx-content-data';
import { XxxContentEffects } from './xxx-content-effects';
import { xxxContentInitialState, XxxContentType } from './xxx-content-types';
import * as XxxContentSelectors from './xxx-content-selectors';

describe('XxxContentEffects', () => {
  let actions$: Observable<Action> = new Observable<Action>();
  const contentKey: string = 'home';
  let service: XxxContentEffects;

  const mockContentData = {
    getContent: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: xxxContentInitialState
        }),
        { provide: XxxContentData, useValue: mockContentData },
        XxxContentEffects
      ]
    });
    actions$ = TestBed.inject(Actions);
    service = TestBed.inject(XxxContentEffects);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  describe('constructor phase', () => {
    it('should be created', () => {
      expect(service).toBeDefined();
    });
  });

  describe('getContent$', () => {
    it('should run contentData.getContent', () => {
      jest.useFakeTimers();
      mockContentData.getContent.mockReturnValue(of({ mockContentApiHome: mockContentHomeApi }));
      actions$ = of({ type: XxxContentActions.getContent.type, key: contentKey });
      service.getContent$.subscribe(() => {
      });
      // Use runAllTimers to complete the observable subscription
      jest.runAllTimers();
      expect(mockContentData.getContent).toHaveBeenCalledWith(contentKey);
    });

    it('should return success action', () => {
      jest.useFakeTimers();
      let result: boolean = false;
      mockContentData.getContent.mockReturnValue(of(mockContentHomeApi));
      actions$ = of({ type: XxxContentActions.getContent.type, key: contentKey });
      service.getContent$.subscribe((action) => {
        result = action.type === XxxContentActions.getContentSuccess.type;
      });
      jest.runAllTimers();
      expect(result).toBe(true);
    });

    it('should return error action', () => {
      jest.useFakeTimers();
      let result: boolean = false;
      const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({});
      mockContentData.getContent.mockImplementation(() => throwError(() => httpErrorResponse));
      actions$ = of({ type: XxxContentActions.getContent.type, key: contentKey });
      service.getContent$.subscribe((action) => {
        result = action.type === XxxContentActions.getContentError.type;
      });
      jest.runAllTimers();
      expect(result).toBe(true);
    });
  });

  describe('showContent$', () => {
    it('should return getContent action when not loaded', () => {
      jest.useFakeTimers();
      // You cannot use overrideSelector for a selector with parameters,
      // so you must use a spy with a mock return value
      jest.spyOn(XxxContentSelectors, 'selectIsContentLoaded').mockReturnValue(
        createSelector(
          (): XxxContentType | undefined => undefined,
          (): boolean => false
        )
      );
      let result: boolean = false;
      actions$ = of({ type: XxxContentActions.showContent.type, key: contentKey });
      service.showContent$.subscribe((action) => {
        result = action.type === XxxContentActions.getContent.type &&
          action.key === contentKey;
      });
      jest.runAllTimers();
      expect(result).toBe(true);
    });
  });
});
