import { XxxUserType, XxxUserApiResponse, XxxUserState } from './xxx-user-types';

export const getUsers = (state: XxxUserState) => {
  return {
    ...state,
    isUsersLoading: true,
    users: []
  }
}

export const getUsersError = (state: XxxUserState) => {
  return {
    ...state,
    isUsersLoading: false,
  }
}

export const getUsersSuccess = (state: XxxUserState, action: { payload: XxxUserApiResponse }) => {
  const users: XxxUserType[] = <XxxUserType[]>JSON.parse(JSON.stringify(action.payload.users));
  return {
    ...state,
    isUsersLoading: false,
    users,
  }
}
export const setSelectedUserId = (state: XxxUserState, action: { userId: number }) => {
  return {
    ...state,
    selectedUserId: action.userId
  }
}
