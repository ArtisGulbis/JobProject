import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import reduxThunk from 'redux-thunk';
import rootReducer from './root-reducer';

const middlewares = [reduxThunk, logger];

if (process.env.NODE_ENV === 'production') {
  middlewares.pop();
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export type RootStore = ReturnType<typeof rootReducer>;

export const persistor = persistStore(store);

export default { store, persistor };
