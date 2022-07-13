import React, { ChangeEvent, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
// import styled from 'styled-components';

// import { Button } from './components/atoms/Button';
// import { ReactComponent as FavoriteIcon } from './assets/icons/favoritesIcon.svg';
// import { ColorService } from './services/ColorService';
import { Input } from './components/atoms/Input';
import { RegistrationPage } from './components/pages/Registration';
import { FormTemplate } from './components/templates/FormTemplate/FormTemplate';

function App() {
  const onChange = async (event: ChangeEvent<HTMLInputElement>, field: string) => {
    console.log({ event, field });
    setName(event.target.value);
  };

  const [name, setName] = useState('');

  return (
    <div className="App">
      <RegistrationPage />
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
//     console.log(data);
//   });

export default App;
