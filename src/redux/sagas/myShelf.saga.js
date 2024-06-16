import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { call } from 'redux-saga/effects';

function* fetchMyItems() {
  try {
    const response = yield axios.get(`/api/shelf/${action.payload}`);
    yield put({ type: 'SET_SHELF', payload: response.data });
  } catch (error) {
    console.error(`Error getting item`);
  }
}

function* myShelfSaga() {
    yield takeLatest('FETCH_MY_ITEMS', fetchMyItems);
}

export default myShelfSaga;