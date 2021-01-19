import { Dispatch } from 'redux';
import { UserDispatchTypes, SET_TOKEN, REMOVE_TOKEN } from './userActionTypes';

export const setToken = (username: string, token: string) => async (
  dispatch: Dispatch<UserDispatchTypes>
) => {
  dispatch({ type: SET_TOKEN, payload: { username, token } });
};

export const removeToken = () => (dispatch: Dispatch<UserDispatchTypes>) => {
  dispatch({ type: REMOVE_TOKEN });
};
