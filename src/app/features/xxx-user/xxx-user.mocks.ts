import { XxxUserApiResponse, XxxUserState, XxxUserType } from './xxx-user-types';

export const mockUser: XxxUserType = {
  firstName: 'John',
  id: 1,
  lastName: 'Doe',
};

export const mockUser2: XxxUserType = {
  firstName: 'Susan',
  id: 2,
  lastName: 'Smith',
};

export const mockUser1: XxxUserType = {
  firstName: 'Bob',
  id: 3,
  lastName: 'Jones',
};

export const mockUsers: XxxUserType[] = [mockUser, mockUser2, mockUser1];

export const mockUserState: XxxUserState = {
  isUsersLoading: false,
  selectedUserId: undefined,
  users: mockUsers,
};

export const mockUserStateLoading: XxxUserState = {
  isUsersLoading: true,
  selectedUserId: undefined,
  users: [],
};

export const mockUserStateSelected: XxxUserState = {
  isUsersLoading: false,
  selectedUserId: mockUser.id,
  users: mockUsers,
};

export const mockXxxUserApiResponse: XxxUserApiResponse = {
  limit: 10,
  skip: 0,
  total: 3,
  users: mockUsers,
};
