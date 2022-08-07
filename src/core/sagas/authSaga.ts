import { call, put, takeEvery, select } from 'redux-saga/effects';
import { AuthService } from '../../services/api/AuthService';
import { actions } from '../constants';
import {
  setIsSuccess,
  setError,
  setIsSuccessActivation,
  setErrorActivation,
} from '../slices/authSlice';
import { setIsShowModalPost } from '../slices/postsSlice';

function* sendRegistrationSaga({ payload }: any) {
  try {
    yield call(() => AuthService.signUp(payload));

    yield put(setIsSuccess(true));
  } catch (e) {
    // console.log({ e });
    yield put(setError('Error'));
  }
}

function* sendRegistrationConfirmSaga({ payload }: any) {
  try {
    yield call(() => AuthService.confirmRegistration(payload));

    yield put(setIsSuccessActivation(true));
  } catch (e) {
    // console.log({ e });
    yield put(setErrorActivation('Error'));
  }
}

export function* authSaga() {
  yield takeEvery(actions.SEND_REGISTRATION, sendRegistrationSaga);
  yield takeEvery(actions.SEND_REGISTRATION_CONFIRM, sendRegistrationConfirmSaga);
}
