import { createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPostsInfo, IPost, IPostSendRequest } from '../../types/posts';
import { ACTIONS } from '../constants';
// const axios = require('axios');
const API_URL = 'https://studapi.teachmeskills.by/blog/posts/?limit=20';

export const sendPostAction = createAction<IPostSendRequest>(ACTIONS.SEND_POST);

export const getMyPostsAction = createAction(ACTIONS.GET_MY_POSTS);

interface IPostSate {
  posts: IPostsInfo | null;
  isShowModalPost: boolean;
  selectedPost: IPost | null;
  selectedPostsList: IPost[] | null;
  isShowModalPostsList: boolean;
  isEditMode: boolean;
  searchValue: string;
  orderingValue: string;
  myPosts: IPost[] | null;
  isSendedPost: boolean;
}

const initialState: IPostSate = {
  posts: null,
  isShowModalPost: false,
  selectedPost: null,
  selectedPostsList: null,
  isShowModalPostsList: false,
  isEditMode: false,
  searchValue: '',
  orderingValue: '',
  myPosts: null,
  isSendedPost: false,
};

export const postsSlide = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action) => {
      const posts = action.payload.results.map((post: IPost) => ({
        ...post,
        isFavorite: false,
        likes: 0,
        dislikes: 0,
      }));
      state.posts = { ...action.payload, results: posts };
    },
    removePosts: (state) => {
      state.posts = null;
    },
    toggleFavorite: (state, action) => {
      if (state.posts) {
        const newPosts = state?.posts.results.map((post: IPost) => ({
          ...post,
          isFavorite: post.id === action.payload ? !post.isFavorite : post.isFavorite,
        }));
        state.posts = { ...state.posts, results: newPosts };
      }
    },
    likePost: (state, action) => {
      if (state.posts) {
        const newPosts = state?.posts.results.map((post: IPost) => ({
          ...post,
          likes: post.id === action.payload ? post.likes + 1 : post.likes,
        }));
        state.posts = { ...state.posts, results: newPosts };
      }
    },
    dislikePost: (state, action) => {
      if (state.posts) {
        const newPosts = state?.posts.results.map((post: IPost) => ({
          ...post,
          dislikes: post.id === action.payload ? post.dislikes + 1 : post.dislikes,
        }));
        state.posts = { ...state.posts, results: newPosts };
      }
    },
    setIsShowModalPost: (state, action) => {
      state.isShowModalPost = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    setIsShowModalPostsList: (state, action) => {
      state.isShowModalPostsList = action.payload;
    },
    setSelectedPostsList: (state, action) => {
      state.selectedPostsList = state.selectedPostsList
        ? [...state.selectedPostsList, ...action.payload]
        : action.payload;
    },
    setIsEditMode: (state, action) => {
      state.isEditMode = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setOrderingValue: (state, action) => {
      state.orderingValue = action.payload;
    },
    setMyPosts: (state, action) => {
      state.myPosts = action.payload;
    },
    setIsSendedPost: (state, action) => {
      state.isSendedPost = action.payload;
    },
    // getTodo: (state, action) => {
    //   state.data = [action.payload];
    // },
  },
});

export const getPostsAsync =
  ({ searchValue, orderingValue }: { searchValue: string; orderingValue: string }) =>
  async (dispatch: any) => {
    try {
      const response = await axios.get(
        `${API_URL}&search=${searchValue}&ordering=${orderingValue}`,
      );
      dispatch(addPosts(response.data));
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const {
  addPosts,
  removePosts,
  toggleFavorite,
  setIsShowModalPost,
  setSelectedPost,
  setIsShowModalPostsList,
  setSelectedPostsList,
  setIsEditMode,
  likePost,
  dislikePost,
  setSearchValue,
  setOrderingValue,
  setMyPosts,
  setIsSendedPost,
} = postsSlide.actions;

export const showPosts = ({
  posts: { posts, searchValue, orderingValue, myPosts, isSendedPost },
}: {
  posts: IPostSate;
}) => ({ posts, searchValue, orderingValue, myPosts, isSendedPost });

export const getSelectedPost = (state: { posts: IPostSate }) => state.posts.selectedPost;
export const getIsShowModalPost = (state: { posts: IPostSate }) => state.posts.isShowModalPost;
// export const getSelectedPost = (state: { posts: IPostSate }) => state.posts.selectedPost;
export const getSelectedPosts = ({ posts }: { posts: IPostSate }) => ({
  selectedPostsList: posts?.selectedPostsList,
  isShowModalPostsList: posts?.isShowModalPostsList,
  isEditMode: posts.isEditMode,
});
// export const showFavoritesPosts = (state: { posts: IPostSate }) =>
//   state.posts || st.posts.filter((post: IPost) => post.isFavorite);
export default postsSlide.reducer;

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
