import React, { ChangeEvent, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// import logo from './logo.svg';
import './App.css';
// import styled from 'styled-components';

// import { Button } from './components/atoms/Button';
// import { ReactComponent as FavoriteIcon } from './assets/icons/favoritesIcon.svg';
// import { ColorService } from './services/ColorService';
import { Input } from './components/atoms/Input';
import { RegistrationPage } from './components/pages/Registration';
import { FormTemplate } from './components/templates/FormTemplate/FormTemplate';
import { PostsPage } from './components/pages/Posts/Posts';
import { Header } from './components/molecules/Header/Header';
import { PostPage } from './components/pages/Post/Post';
import { FavoritesPage } from './components/pages/Favorites/Favorites';
import { RegistrationActivation } from './components/pages/Registration/RegistrationActivation';
import { LoginPage } from './components/pages/Login/Login';
import { useExitPrompt } from './components/pages/Login/useExitPrompt';
import { useDispatch } from 'react-redux';
import { bootstrapSagaAction } from './core/slices/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bootstrapSagaAction());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/activate/:uid/:token"
            element={
              // <div></div>
              <FormTemplate title="Confirm">
                <RegistrationActivation />
              </FormTemplate>
            }></Route>
          <Route
            path="/posts"
            element={
              // <div></div>
              <FormTemplate title="Posts">
                <PostsPage />
              </FormTemplate>
            }>
            {/* <Route
              path=":postID"
              element={
                // <div></div>
                <FormTemplate title="text">
                  <PostPage />
                </FormTemplate>
              }></Route> */}
          </Route>
          <Route
            path="/favorites"
            element={
              // <div></div>
              <FormTemplate title="favorites">
                <FavoritesPage />
              </FormTemplate>
            }>
            {/* <Route
              path=":postID"
              element={
                // <div></div>
                <FormTemplate title="text">
                  <PostPage />
                </FormTemplate>
              }></Route> */}
          </Route>
          <Route
            path="/posts/:postID"
            element={
              // <div></div>
              <FormTemplate title="text">
                <PostPage />
              </FormTemplate>
            }></Route>
          <Route
            path="/login"
            element={
              <FormTemplate title="text">
                <LoginPage />
              </FormTemplate>
            }></Route>
          <Route
            path="/"
            element={
              <FormTemplate title="Registration">
                <RegistrationPage />
              </FormTemplate>
            }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// const FavoriteIconStyled = styled(FavoriteIcon)`
//   path {
//     fill: ${ColorService.SECONDARY};
//   }
// `;

// fetch('https://studapi.teachmeskills.by/blog/posts/?limit=20')
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//      // console.log(data);
//   });

export default App;
