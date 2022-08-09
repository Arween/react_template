import { createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPostsInfo, IPost } from '../../types/posts';
import { IUserConfirm, IProfile } from '../../types/user';
import { ACTIONS } from '../constants';
// const axios = require('axios');
// const API_URL = 'https://studapi.teachmeskills.by/blog/posts/?limit=20';

interface IAuthSate {
  email: string | null;
  error: string | null;
  isSuccess: boolean;
  errorActivation: boolean;
  isSuccessActivation: boolean;
  profile: null | IProfile;
}

const initialState: IAuthSate = {
  email: null,
  error: null,
  isSuccess: false,
  errorActivation: false,
  isSuccessActivation: false,
  profile: null,
};

interface IUser {
  username: string;
  email: string;
  password: string;
}

interface ILoginUser {
  email: string;
  password: string;
}

export const sendRegistrationAction = createAction<IUser>(ACTIONS.SEND_REGISTRATION);
export const sendLoginAction = createAction<ILoginUser>(ACTIONS.SEND_LOGIN);
export const sendRegistrationConfirmAction = createAction<IUserConfirm>(
  ACTIONS.SEND_REGISTRATION_CONFIRM,
);
export const bootstrapSagaAction = createAction(ACTIONS.BOOTSTRAP_SAGA);

export const authSlide = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    setErrorActivation: (state, action) => {
      state.errorActivation = action.payload;
    },
    setIsSuccessActivation: (state, action) => {
      state.isSuccessActivation = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    // getTodo: (state, action) => {
    //   state.data = [action.payload];
    // },
  },
});

export const {
  setEmail,
  setError,
  setIsSuccess,
  setErrorActivation,
  setIsSuccessActivation,
  setProfile,
} = authSlide.actions;

// http://studapi.teachmeskills.by//activate/NDgw/b9jkno-b746256ae1fae9e3cf1c91a21f2bc338

// export const showPosts = ({
//   posts: { posts, searchValue, orderingValue },
// }: {
//   posts: IAuthSate;
// }) => ({ posts, searchValue, orderingValue });

export const getStoreActivation = ({
  auth: { errorActivation, isSuccessActivation },
}: {
  auth: IAuthSate;
}) => ({
  errorActivation,
  isSuccessActivation,
});

export const getStoreProfile = ({ auth: { profile } }: { auth: IAuthSate }) => profile;
// export const getSelectedPost = (state: { posts: IPostSate }) => state.posts.selectedPost;
// export const getIsShowModalPost = (state: { posts: IPostSate }) => state.posts.isShowModalPost;
// // export const getSelectedPost = (state: { posts: IPostSate }) => state.posts.selectedPost;
// export const getSelectedPosts = ({ posts }: { posts: IPostSate }) => ({
//   selectedPostsList: posts?.selectedPostsList,
//   isShowModalPostsList: posts?.isShowModalPostsList,
//   isEditMode: posts.isEditMode,
// });
// export const showFavoritesPosts = (state: { posts: IPostSate }) =>
//   state.posts || st.posts.filter((post: IPost) => post.isFavorite);
export default authSlide.reducer;

// || st.posts.filter((post: IPost) => post.isFavorite)

// export const getTodoAsync = (data) => async (dispatch) => {
//   try {
//     const response = await axios.get(`${API_URL}/${data}`);
//     dispatch(getTodo(response.data));
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// export const addTodoAsync = (data) => async (dispatch) => {
//   try {
//     //  // console.log(data);
//     const response = await axios.post(API_URL, data);
//     //  // console.log(response);
//     dispatch(addTodo(response.data));
//   } catch (err) {
//     throw new Error(err);
//   }
// };
