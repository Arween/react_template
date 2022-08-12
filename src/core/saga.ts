import { all } from 'redux-saga/effects';

import { authSaga, postsSaga } from './sagas';

export function* rootSaga() {
  try {
    yield all([authSaga(), postsSaga()]);
  } catch (e) {
    // console.log({ e });
  }
}
