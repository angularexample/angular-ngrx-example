import { mockUser, mockUserState, mockUserStateLoading, mockUserStateSelected } from './xxx-user.mocks';
import * as XxxUserSelectors from './xxx-user-selectors';
import { XxxUserType } from './xxx-user-types';

describe('xxx-user-selectors', () => {

  describe('selectIsUsersLoading', () => {
    it('should return true when loading', () => {
      const result: unknown = XxxUserSelectors.selectIsUsersLoading.projector(mockUserStateLoading);
      expect(result).toBe(true);
    });

    it('should return false when not loading', () => {
      const result: unknown = XxxUserSelectors.selectIsUsersLoading.projector(mockUserState);
      expect(result).toBe(false);
    });
  });

  describe('selectSelectedUserId', () => {
    it('should return selected user id', () => {
      const expectedResult: number = mockUser.id;
      const result: unknown = XxxUserSelectors.selectSelectedUserId.projector(mockUserStateSelected);
      expect(result).toBe(expectedResult);
    });
  });

  describe('selectUsers', () => {
    it('should return array of all users`', () => {
      const expectedResult: XxxUserType[] = mockUserState.users;
      const result: unknown = XxxUserSelectors.selectUsers.projector(mockUserState);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('selectIsUsersLoaded', () => {
    it('should return true when loaded', () => {
      const result: unknown = XxxUserSelectors.selectIsUsersLoaded.projector(mockUserState.users);
      expect(result).toBe(true);
    });

    it('should return false when not loaded', () => {
      const result: unknown = XxxUserSelectors.selectIsUsersLoaded.projector([]);
      expect(result).toBe(false);
    });
  });

  describe('selectIsUsersEmpty', () => {
    it('should return true when not loading and empty', () => {
      const result: unknown = XxxUserSelectors.selectIsUsersEmpty.projector(false, []);
      expect(result).toBe(true);
    });

    it('should return false when loading', () => {
      const result: unknown = XxxUserSelectors.selectIsUsersEmpty.projector(true, []);
      expect(result).toBe(false);
    });

    it('should return false when not loading and not empty', () => {
      const result: unknown = XxxUserSelectors.selectIsUsersEmpty.projector(false, mockUserState.users);
      expect(result).toBe(false);
    });
  });
});
