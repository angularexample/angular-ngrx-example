import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { XxxUserActions } from './xxx-user.actions';
import { XxxUserFacade } from './xxx-user-facade';
import { xxxUserInitialState } from './xxx-user-types';

describe('XxxUserFacade', () => {
  const mockUserId = 1;
  let service: XxxUserFacade;
  let spyDispatch: jest.SpyInstance;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState: xxxUserInitialState }),
        XxxUserFacade
      ]
    });
    service = TestBed.inject(XxxUserFacade);
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

    it('should have isUsersEmpty$', () => {
      expect(service.isUsersEmpty$).toBeDefined();
    });

    it('should have isUsersLoaded$', () => {
      expect(service.isUsersLoaded$).toBeDefined();
    });

    it('should have isUsersLoading$', () => {
      expect(service.isUsersLoading$).toBeDefined();
    });

    it('should have selectedUserId$', () => {
      expect(service.selectedUserId$).toBeDefined();
    });

    it('should have users$', () => {
      expect(service.users$).toBeDefined();
    });
  });

  describe('showUsers', () => {
    it('should call dispatch showUsers', () => {
      service.showUsers();
      expect(spyDispatch).toHaveBeenCalledWith({ type: XxxUserActions.showUsers.type });
    });
  });

  describe('setSelectedUserId', () => {
    it('should should call dispatch setSelectedUserId', () => {
      service.setSelectedUserId(mockUserId);
      expect(spyDispatch).toHaveBeenCalledWith({ type: XxxUserActions.setSelectedUserId.type, userId: mockUserId });
    });
  });
});
