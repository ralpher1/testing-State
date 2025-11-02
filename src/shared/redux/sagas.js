// Redux Sagas with detailed logging

import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import { actionTypes, updateValueSuccess, updateValueFailure, fetchValueSuccess, fetchValueFailure } from './actions';

// API calls
function* updateValueSaga(action) {
  console.log('\n[REDUX SAGA] ========================================');
  console.log('[REDUX SAGA] updateValueSaga triggered');
  console.log('[REDUX SAGA] Action:', action);
  console.log('[REDUX SAGA] Value to update:', action.payload.value);

  try {
    console.log('[REDUX SAGA] Making API call to /api/value');

    const response = yield call(axios.post, '/api/value', {
      value: action.payload.value
    });

    console.log('[REDUX SAGA] API Response received:', response.data);
    console.log('[REDUX SAGA] Dispatching updateValueSuccess');

    // Send debug info back to server
    yield call(sendDebugInfo, {
      action: 'UPDATE_VALUE',
      sagaState: 'SUCCESS',
      value: action.payload.value,
      timestamp: new Date().toISOString()
    });

    yield put(updateValueSuccess(action.payload.value));

    console.log('[REDUX SAGA] updateValueSuccess dispatched successfully');
    console.log('[REDUX SAGA] ========================================\n');
  } catch (error) {
    console.error('[REDUX SAGA] Error in updateValueSaga:', error.message);
    console.log('[REDUX SAGA] Dispatching updateValueFailure');

    yield call(sendDebugInfo, {
      action: 'UPDATE_VALUE',
      sagaState: 'FAILURE',
      error: error.message,
      timestamp: new Date().toISOString()
    });

    yield put(updateValueFailure(error.message));
    console.log('[REDUX SAGA] ========================================\n');
  }
}

function* fetchValueSaga() {
  console.log('\n[REDUX SAGA] ========================================');
  console.log('[REDUX SAGA] fetchValueSaga triggered');

  try {
    console.log('[REDUX SAGA] Making API call to /api/value');

    const response = yield call(axios.get, '/api/value');

    console.log('[REDUX SAGA] API Response received:', response.data);
    console.log('[REDUX SAGA] Dispatching fetchValueSuccess');

    yield call(sendDebugInfo, {
      action: 'FETCH_VALUE',
      sagaState: 'SUCCESS',
      value: response.data.value,
      timestamp: new Date().toISOString()
    });

    yield put(fetchValueSuccess(response.data.value));

    console.log('[REDUX SAGA] fetchValueSuccess dispatched successfully');
    console.log('[REDUX SAGA] ========================================\n');
  } catch (error) {
    console.error('[REDUX SAGA] Error in fetchValueSaga:', error.message);
    console.log('[REDUX SAGA] Dispatching fetchValueFailure');

    yield call(sendDebugInfo, {
      action: 'FETCH_VALUE',
      sagaState: 'FAILURE',
      error: error.message,
      timestamp: new Date().toISOString()
    });

    yield put(fetchValueFailure(error.message));
    console.log('[REDUX SAGA] ========================================\n');
  }
}

function* sendDebugInfo(debugData) {
  try {
    console.log('[REDUX SAGA] Sending debug info to server:', debugData);
    yield call(axios.post, '/api/debug', debugData);
    console.log('[REDUX SAGA] Debug info sent successfully');
  } catch (error) {
    console.error('[REDUX SAGA] Failed to send debug info:', error.message);
  }
}

// Watcher sagas
function* watchUpdateValue() {
  console.log('[REDUX SAGA] Watcher: watchUpdateValue initialized');
  yield takeLatest(actionTypes.UPDATE_VALUE_REQUEST, updateValueSaga);
}

function* watchFetchValue() {
  console.log('[REDUX SAGA] Watcher: watchFetchValue initialized');
  yield takeLatest(actionTypes.FETCH_VALUE_REQUEST, fetchValueSaga);
}

// Root saga
export default function* rootSaga() {
  console.log('[REDUX SAGA] Root saga initialized - Starting all watchers');
  yield all([
    watchUpdateValue(),
    watchFetchValue()
  ]);
  console.log('[REDUX SAGA] All saga watchers are now active');
}
