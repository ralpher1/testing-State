// Redux Reducer with detailed logging

import { actionTypes } from './actions';

const initialState = {
  value: '',
  loading: false,
  error: null,
  lastUpdated: null
};

const rootReducer = (state = initialState, action) => {
  console.log('\n[REDUX REDUCER] ==========================================');
  console.log('[REDUX REDUCER] Action received:', action.type);
  console.log('[REDUX REDUCER] Current state:', state);
  console.log('[REDUX REDUCER] Action payload:', action.payload);

  let newState = state;

  switch (action.type) {
    case actionTypes.UPDATE_VALUE_REQUEST:
      newState = {
        ...state,
        loading: true,
        error: null
      };
      console.log('[REDUX REDUCER] UPDATE_VALUE_REQUEST - Setting loading to true');
      break;

    case actionTypes.UPDATE_VALUE_SUCCESS:
      newState = {
        ...state,
        value: action.payload.value,
        loading: false,
        error: null,
        lastUpdated: new Date().toISOString()
      };
      console.log('[REDUX REDUCER] UPDATE_VALUE_SUCCESS - Value updated to:', action.payload.value);
      break;

    case actionTypes.UPDATE_VALUE_FAILURE:
      newState = {
        ...state,
        loading: false,
        error: action.payload.error
      };
      console.log('[REDUX REDUCER] UPDATE_VALUE_FAILURE - Error:', action.payload.error);
      break;

    case actionTypes.FETCH_VALUE_REQUEST:
      newState = {
        ...state,
        loading: true,
        error: null
      };
      console.log('[REDUX REDUCER] FETCH_VALUE_REQUEST - Setting loading to true');
      break;

    case actionTypes.FETCH_VALUE_SUCCESS:
      newState = {
        ...state,
        value: action.payload.value || '',
        loading: false,
        error: null,
        lastUpdated: new Date().toISOString()
      };
      console.log('[REDUX REDUCER] FETCH_VALUE_SUCCESS - Value fetched:', action.payload.value);
      break;

    case actionTypes.FETCH_VALUE_FAILURE:
      newState = {
        ...state,
        loading: false,
        error: action.payload.error
      };
      console.log('[REDUX REDUCER] FETCH_VALUE_FAILURE - Error:', action.payload.error);
      break;

    default:
      console.log('[REDUX REDUCER] Unknown action type, returning current state');
      break;
  }

  console.log('[REDUX REDUCER] New state:', newState);
  console.log('[REDUX REDUCER] ==========================================\n');

  return newState;
};

export default rootReducer;
