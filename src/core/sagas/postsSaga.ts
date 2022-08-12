import { call, put, takeEvery } from 'redux-saga/effects';
import { AuthService } from '../../services/api/AuthService';
import { UserService } from '../../services/api/UserService';
import { ITokens, IProfile } from '../../types/user';
import { ACTIONS } from '../constants';
import { setProfile, setErrorActivation } from '../slices/authSlice';
import { PostsService } from '../../services/api/PostsService';
import { setIsSendedPost, setMyPosts } from '../slices/postsSlice';

function* getMyPostsSaga() {
  try {
    const data: { data: ITokens } = yield call(() => PostsService.getMyPosts());

    yield put(setMyPosts(data.data));
  } catch (e) {
    // console.log({ e });
    yield put(setErrorActivation('Error'));
  }
}

function* sendPostSaga({ payload }: any) {
  try {
    yield call(() => PostsService.sendPost(payload));

    yield put(setIsSendedPost(true));
  } catch (e) {
    // console.log({ e });
    yield put(setIsSendedPost(false));
  }
}

export function* postsSaga() {
  yield takeEvery(ACTIONS.SEND_POST, sendPostSaga);
  yield takeEvery(ACTIONS.GET_MY_POSTS, getMyPostsSaga);
}
