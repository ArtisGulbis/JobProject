import { REMOVE_TOKEN, SET_TOKEN, UserDispatchTypes } from './userActionTypes';

export interface UserStateI {
  token: string;
  username: string;
  error: string;
}

const initialState: UserStateI = {
  token: undefined,
  username: undefined,
  error: '',
};

export const userReducer = (
  state: UserStateI = initialState,
  action: UserDispatchTypes
): UserStateI => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        token: undefined,
        username: undefined,
      };
    default:
      return state;
  }
};
