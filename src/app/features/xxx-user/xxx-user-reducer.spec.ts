import { XxxUserActions } from './xxx-user-actions';
import { xxxUserInitialState, XxxUserState } from './xxx-user-types';
import { xxxUserReducer } from './xxx-user-reducer';
import {
  mockUser,
  mockUserState,
  mockUserStateLoading,
  mockUserStateSelected,
  mockXxxUserApiResponse
} from './xxx-user.mocks';

describe('xxxUserReducer', () => {

  describe('getUsers', () => {
    it('should set loading true', () => {
      const startingState: XxxUserState = xxxUserInitialState;
      const expectedState: XxxUserState = {
        ...xxxUserInitialState,
        isUsersLoading: true,
        users: []
      };
      const result: XxxUserState = xxxUserReducer(startingState, XxxUserActions.getUsers());
      expect(result).toEqual(expectedState);
    });

    it('should empty users', () => {
      const startingState: XxxUserState = mockUserState;
      const expectedState: XxxUserState = {
        ...xxxUserInitialState,
        isUsersLoading: true,
        users: []
      };
      const result: XxxUserState = xxxUserReducer(startingState, XxxUserActions.getUsers());
      expect(result).toEqual(expectedState);
    });
  });

  describe('getUsersError', () => {
    it('should set loading false', () => {
      const startingState: XxxUserState = mockUserStateLoading;
      const expectedState: XxxUserState = {
        ...mockUserStateLoading,
        isUsersLoading: false
      };
      const result: XxxUserState = xxxUserReducer(startingState, XxxUserActions.getUsersError());
      expect(result).toEqual(expectedState);
    });
  });

  describe('getUsersSuccess', () => {
    it('should set loading false and set users', () => {
      const startingState: XxxUserState = mockUserStateLoading;
      const expectedState: XxxUserState = {
        ...mockUserStateLoading,
        isUsersLoading: false,
        users: mockXxxUserApiResponse.users
      };
      const result: XxxUserState = xxxUserReducer(startingState, XxxUserActions.getUsersSuccess({ payload: mockXxxUserApiResponse }));
      expect(result).toEqual(expectedState);
    });
  });

  describe('setSelectedUserId', () => {
    it('should set selected user id', () => {
      const startingState: XxxUserState = mockUserState;
      const expectedState: XxxUserState = mockUserStateSelected;
      const result: XxxUserState = xxxUserReducer(startingState, XxxUserActions.setSelectedUserId({ userId: mockUser.id }));
      expect(result).toEqual(expectedState);
    });
  });
});
