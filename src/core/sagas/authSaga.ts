import { call, put, takeEvery, select } from 'redux-saga/effects';
import { AuthService } from '../../services/api/AuthService';
import { actions } from '../constants';
import { setIsSuccess, setError } from '../slices/authSlice';
import { setIsShowModalPost } from '../slices/postsSlice';
// import { Action } from 'redux-actions';

// import { AuthService } from "src/services/AuthService";
// import { IUserAuth } from 'src/types/user';
// import { sendRegistrationDataError, setUsernameAction } from '../actions';
// import { ACTIONS } from '../actions/constants';
// import { getRegistrationSelector } from '../selectors/registrationSelectors';
// import { IRegistrationState } from '../reducers/registrationReducer';

function* sendRegistrationSaga({ payload }: any) {
  try {
    // const data: IRegistrationState = yield select(getRegistrationSelector);

    // console.log(data);
    console.log('registrationData:', payload);

    yield call(() => AuthService.signUp(payload));

    yield put(setIsSuccess(true));

    // const data = yield call(() =>
    //   AuthService.signUp({ username, password, email })
    // );

    // console.log({ data });
  } catch (e) {
    console.log({ e });
    yield put(setError('Error'));
    // yield put(setUsernameAction(''));
    // yield put(sendRegistrationDataError({ e }));
  }
}

function* sendRegistrationConfirmSaga({ payload }: any) {
  try {
    // const data: IRegistrationState = yield select(getRegistrationSelector);

    // console.log(data);
    console.log('registrationData:', payload);

    yield call(() => AuthService.confirmRegistration(payload));

    yield put(setIsSuccess(true));

    // const data = yield call(() =>
    //   AuthService.signUp({ username, password, email })
    // );

    // console.log({ data });
  } catch (e) {
    console.log({ e });
    yield put(setError('Error'));
    // yield put(setUsernameAction(''));
    // yield put(sendRegistrationDataError({ e }));
  }
}

export function* authSaga() {
  yield takeEvery(actions.SEND_REGISTRATION, sendRegistrationSaga);
  yield takeEvery(actions.SEND_REGISTRATION_CONFIRM, sendRegistrationConfirmSaga);
}
