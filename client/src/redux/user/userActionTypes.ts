export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

export type Token = {
  token: string;
  username: string;
};

export type UserError = {
  errMsg: string;
};

export interface SetToken {
  type: typeof SET_TOKEN;
  payload: Token;
}

export interface RemoveToken {
  type: typeof REMOVE_TOKEN;
}

export type UserDispatchTypes = SetToken | RemoveToken;
