import { mockContentHome } from './xxx-content.mocks';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectContentByKey, selectIsContentEmpty, selectIsContentError } from './xxx-content.selectors';
import { TestBed } from '@angular/core/testing';
import { XxxContentFacade } from './xxx-content-facade';
import { xxxContentInitialState } from './xxx-content-types';

describe('XxxContentFacade', () => {
  const contentKey: string = 'home';

  TestBed.configureTestingModule({
    providers: [
      provideMockStore({
        initialState: xxxContentInitialState,
        selectors: [
          {
            selector: selectContentByKey(contentKey),
            value: mockContentHome
          },
          {
            selector: selectIsContentEmpty(contentKey),
            value: false
          },
          {
            selector: selectIsContentError(contentKey),
            value: true
          }
        ]
      }),
      XxxContentFacade
    ]
  });

  const service: XxxContentFacade = TestBed.inject(XxxContentFacade);
  const store: MockStore = TestBed.inject(MockStore);

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
    it('should run store.select(selectContentByKey)', () => {
      service.contentByKey$(contentKey).subscribe((result) => {
        expect(result).toEqual(mockContentHome);
      });
    });
  });

  describe('isContentEmpty$', () => {
    it('should run store.select(selectIsContentEmpty)', () => {
      service.isContentEmpty$(contentKey).subscribe((result) => {
        expect(result).toBe(false);
      });
    });
  });

  describe('isContentError$', () => {
    it('should run store.select(selectIsContentError)', () => {
      service.contentByKey$(contentKey).subscribe((result) => {
        expect(result).toBe(true);
      });
    });
  });

  describe('showContent', () => {
    it('should run store.dispatch(XxxContentActions.showContent)', () => {
      service.showContent(contentKey);
      store.scannedActions$.subscribe((actions) => {
        console.log(actions);
        expect(actions).toEqual({ key: 'home', type: '[xxxContent] showContent' });
      });
    });
  });
});
