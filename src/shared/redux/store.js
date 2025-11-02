// Redux Store Configuration with detailed logging

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

// Logging middleware
const loggerMiddleware = store => next => action => {
  console.log('\n[REDUX MIDDLEWARE] ================================');
  console.log('[REDUX MIDDLEWARE] Dispatching action:', action.type);
  console.log('[REDUX MIDDLEWARE] Action payload:', action.payload);
  console.log('[REDUX MIDDLEWARE] State before:', store.getState());

  const result = next(action);

  console.log('[REDUX MIDDLEWARE] State after:', store.getState());
  console.log('[REDUX MIDDLEWARE] ================================\n');

  return result;
};

export const configureStore = (initialState = {}) => {
  console.log('[REDUX STORE] Configuring Redux store...');
  console.log('[REDUX STORE] Initial state:', initialState);

  const sagaMiddleware = createSagaMiddleware({
    onError: (error) => {
      console.error('[REDUX SAGA] Saga error:', error);
    }
  });

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(loggerMiddleware, sagaMiddleware)
  );

  console.log('[REDUX STORE] Running root saga...');
  sagaMiddleware.run(rootSaga);

  console.log('[REDUX STORE] Store configured successfully');
  console.log('[REDUX STORE] Current state:', store.getState());

  return store;
};
