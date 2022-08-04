import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import postsSlide from './slices/postsSlice';
import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger';

import { composeWithDevTools } from 'redux-devtools-extension';
import { rootSaga } from './saga';
import authSlide from './slices/authSlice';

// const sagaMiddleware = createSagaMiddleware();

// export const initialRootState = {
//   ...store.getState(),
// };

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    auth: authSlide,
    posts: postsSlide,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);
