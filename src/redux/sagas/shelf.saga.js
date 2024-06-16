import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { call } from 'redux-saga/effects';

function* fetchItems() {
  try {
    const response = yield axios.get('/api/shelf');
    yield put({ type: 'SET_SHELF', payload: response.data });
  } catch (error) {
    console.error(`Error getting item`);
  }
}

function* deleteItemSaga(action) {
  try {
        yield console.log(action.payload.id)
      yield call(axios.delete, `/api/shelf/${action.payload.id}`);
      yield put({ type: 'FETCH_ITEMS' });
  } catch (error) {
      console.error('Error in deleteItemSaga', error);
  }
}
function* addItem(action) {
   try {
      yield axios.post('/api/shelf', action.payload);
      yield put({type: 'FETCH_ITEMS'})
   }  catch (error) {
      console.error(`Error adding new item`);
    }
}

function* editItem(action) {
    try {
       yield axios.put(`/api/shelf/${action.payload.id}`, action.payload);
       yield put({type: 'FETCH_ITEMS'})
    }  catch (error) {
       console.error(`Error adding new item`);
     }
 }

function* shelfSaga() {
  yield takeLatest('FETCH_ITEMS', fetchItems);
  yield takeLatest('ADD_ITEM', addItem);
  yield takeLatest('DELETE_ITEM', deleteItemSaga);
  yield takeLatest('UPDATE_ITEM', editItem)
}

export default shelfSaga;