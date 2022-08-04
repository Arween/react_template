import { all } from 'redux-saga/effects';

import { authSaga } from './sagas';

export function* rootSaga() {
  try {
    yield all([authSaga()]);
  } catch (e) {
    console.log({ e });
  }
}
