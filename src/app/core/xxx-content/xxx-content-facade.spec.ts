import { createSelector } from '@ngrx/store';
import { mockContentHome, mockContentState } from './xxx-content.mocks';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { XxxContentActions } from './xxx-content-actions';
import { XxxContentFacade } from './xxx-content-facade';
import * as XxxContentSelectors from './xxx-content-selectors';
import { XxxContentType } from './xxx-content-types';

describe('XxxContentFacade', () => {
  const contentKey: string = 'home';
  let service: XxxContentFacade;
  let spyDispatch: jest.SpyInstance;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState: mockContentState }),
        XxxContentFacade
      ]
    });
    service = TestBed.inject(XxxContentFacade);
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

    it('should have contentByKey$', () => {
      expect(service.contentByKey$).toBeDefined();
    });

    it('should have isContentEmpty$', () => {
      expect(service.isContentEmpty$).toBeDefined();
    });

    it('should have isContentError$', () => {
      expect(service.isContentError$).toBeDefined();
    });
  });

  describe('contentByKey$', () => {
    it('should run select(selectContentByKey)', () => {
      // You cannot use overrideSelector for a selector with parameters,
      // so you must use a spy with a mock return value
      jest.spyOn(XxxContentSelectors, 'selectContentByKey').mockReturnValue(
        createSelector(
          (): XxxContentType[] => [],
          (): XxxContentType | undefined => mockContentHome
        )
      );
      jest.useFakeTimers();
      let result: boolean = false;
      service.contentByKey$(contentKey).subscribe((value: XxxContentType | undefined) => {
        result = value?.key === mockContentHome.key &&
          value?.contentModel?.bodyText === mockContentHome.contentModel?.bodyText &&
          value?.contentModel?.pageTitle === mockContentHome.contentModel?.pageTitle;
      });
      // Use runAllTimers to complete the observable subscription
      jest.runAllTimers();
      expect(result).toBe(true);
    });
  });

  describe('isContentEmpty$', () => {
    it('should run select(selectIsContentEmpty)', () => {
      jest.spyOn(XxxContentSelectors, 'selectIsContentEmpty').mockReturnValue(
        createSelector(
          (): XxxContentType | undefined => undefined,
          (): boolean => true
        )
      );
      jest.useFakeTimers();
      let result: boolean = false;
      service.isContentEmpty$('empty').subscribe((value) => {
        result = value;
      });
      jest.runAllTimers();
      expect(result).toBe(true);
    });
  });

  describe('isContentError$', () => {
    it('should run select(selectIsContentError)', () => {
      jest.spyOn(XxxContentSelectors, 'selectIsContentError').mockReturnValue(
        createSelector(
          (): XxxContentType | undefined => undefined,
          (): boolean => true
        )
      );
      jest.useFakeTimers();
      let result: boolean = false;
      service.isContentError$('error').subscribe((value) => {
        result = value;
      });
      jest.runAllTimers();
      expect(result).toBe(true);
    });
  });

  describe('showContent', () => {
    it('should run dispatch(XxxContentActions.showContent)', () => {
      service.showContent(contentKey);
      expect(spyDispatch).toHaveBeenCalledWith({ key: contentKey, type: XxxContentActions.showContent.type });
    });
  });
});
