import { RootStateOrAny } from 'react-redux';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { RootStore } from './store';

import { userReducer } from './user/userReducer';

const persistConfig = {
  key: 'test',
  storage,
};

const rootReducer = combineReducers({ currentUser: userReducer });

export default persistReducer(persistConfig, rootReducer);
