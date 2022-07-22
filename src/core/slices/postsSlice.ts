import { createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPostsInfo, IPost } from '../../types/posts';
// const axios = require('axios');
const API_URL = 'https://studapi.teachmeskills.by/blog/posts/?limit=20';

interface IPostSate {
  posts: IPostsInfo | null;
}

const initialState: IPostSate = {
  posts: null,
};

export const postsSlide = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action) => {
      const posts = action.payload.results.map((post: IPost) => ({ ...post, isFavorite: false }));
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
    // getTodo: (state, action) => {
    //   state.data = [action.payload];
    // },
  },
});

export const getPostsAsync = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(addPosts(response.data));
  } catch (err: any) {
    throw new Error(err);
  }
};

export const { addPosts, removePosts, toggleFavorite } = postsSlide.actions;
export const showPosts = (state: { posts: IPostSate }) => state.posts.posts;
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
//     // console.log(data);
//     const response = await axios.post(API_URL, data);
//     // console.log(response);
//     dispatch(addTodo(response.data));
//   } catch (err) {
//     throw new Error(err);
//   }
// };
