import { call, put, takeEvery, select } from 'redux-saga/effects';
import { AuthService } from '../../services/api/AuthService';
import { PostsService } from '../../services/api/PostsService';
import { UserService } from '../../services/api/UserService';
import { IPostsInfo } from '../../types/posts';
import { ITokens, IProfile } from '../../types/user';
import { ACTIONS } from '../constants';
import {
  setIsSuccess,
  setError,
  setIsSuccessActivation,
  setErrorActivation,
  setProfile,
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

function* sendLoginSaga({ payload }: any) {
  try {
    const data: { data: ITokens } = yield call(() => AuthService.login(payload));

    const { access, refresh } = data?.data as ITokens;
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);

    const usersData: { data: IProfile[] } = yield call(() => UserService.getMyUser());

    const user = usersData?.data as IProfile[];

    yield put(setProfile(user));

    // yield put(setIsSuccessActivation(true));
  } catch (e) {
    // console.log({ e });
    yield put(setErrorActivation('Error'));
  }
}

function* bootstrapSaga() {
  try {
    const refresh = localStorage.getItem('refresh');

    if (refresh) {
      const data: { data: ITokens } = yield call(() => AuthService.refreshToken(refresh));

      const { access } = data?.data as ITokens;
      localStorage.setItem('access', access);

      const usersData: { data: IProfile[] } = yield call(() => UserService.getMyUser());

      const user = usersData?.data as IProfile[];

      yield put(setProfile(user));

      const dataPosts: { data: IPostsInfo } = yield call(() => PostsService.getMyPosts());
      console.log({ dataPosts });
    }

    // yield put(setIsSuccessActivation(true));
  } catch (e) {
    // console.log({ e });
    yield put(setErrorActivation('Error'));
  }
}

export function* authSaga() {
  yield takeEvery(ACTIONS.SEND_REGISTRATION, sendRegistrationSaga);
  yield takeEvery(ACTIONS.SEND_REGISTRATION_CONFIRM, sendRegistrationConfirmSaga);
  yield takeEvery(ACTIONS.SEND_LOGIN, sendLoginSaga);
  yield takeEvery(ACTIONS.BOOTSTRAP_SAGA, bootstrapSaga);
}

// lvndcvyznvblybmtkf@pptrvv.com

// 1234test67
