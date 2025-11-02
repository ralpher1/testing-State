// Redux Actions with detailed logging

export const actionTypes = {
  UPDATE_VALUE_REQUEST: 'UPDATE_VALUE_REQUEST',
  UPDATE_VALUE_SUCCESS: 'UPDATE_VALUE_SUCCESS',
  UPDATE_VALUE_FAILURE: 'UPDATE_VALUE_FAILURE',
  FETCH_VALUE_REQUEST: 'FETCH_VALUE_REQUEST',
  FETCH_VALUE_SUCCESS: 'FETCH_VALUE_SUCCESS',
  FETCH_VALUE_FAILURE: 'FETCH_VALUE_FAILURE',
};

export const updateValueRequest = (value) => {
  console.log('[REDUX ACTION] updateValueRequest dispatched');
  console.log('[REDUX ACTION] Payload:', { value });
  return {
    type: actionTypes.UPDATE_VALUE_REQUEST,
    payload: { value }
  };
};

export const updateValueSuccess = (value) => {
  console.log('[REDUX ACTION] updateValueSuccess dispatched');
  console.log('[REDUX ACTION] Payload:', { value });
  return {
    type: actionTypes.UPDATE_VALUE_SUCCESS,
    payload: { value }
  };
};

export const updateValueFailure = (error) => {
  console.log('[REDUX ACTION] updateValueFailure dispatched');
  console.log('[REDUX ACTION] Error:', error);
  return {
    type: actionTypes.UPDATE_VALUE_FAILURE,
    payload: { error }
  };
};

export const fetchValueRequest = () => {
  console.log('[REDUX ACTION] fetchValueRequest dispatched');
  return {
    type: actionTypes.FETCH_VALUE_REQUEST
  };
};

export const fetchValueSuccess = (value) => {
  console.log('[REDUX ACTION] fetchValueSuccess dispatched');
  console.log('[REDUX ACTION] Payload:', { value });
  return {
    type: actionTypes.FETCH_VALUE_SUCCESS,
    payload: { value }
  };
};

export const fetchValueFailure = (error) => {
  console.log('[REDUX ACTION] fetchValueFailure dispatched');
  console.log('[REDUX ACTION] Error:', error);
  return {
    type: actionTypes.FETCH_VALUE_FAILURE,
    payload: { error }
  };
};
