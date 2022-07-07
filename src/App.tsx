// import React, { ChangeEvent } from 'react';
// import logo from './logo.svg';
import './App.css';
// import styled from 'styled-components';

// import { Button } from './components/atoms/Button';
// import { ReactComponent as FavoriteIcon } from './assets/icons/favoritesIcon.svg';
// import { ColorService } from './services/ColorService';
// import { Input } from './components/atoms/Input';
// import { Tabs } from './components/atoms/Tabs';
// import { Footer } from './components/atoms/Footer/Footer';
// import { Container } from './components/layouts/Container/Container';
import { FormTemplate } from './components/templates/FormTemplate/FormTemplate';

function App() {
  // const onClick = () => {
  //   console.log('click');
  // };

  // const users = [
  //   { id: 0, name: 'Lucas' },
  //   { id: 1, name: 'William' },
  // ];

  // const tabs = [
  //   { title: 'All', url: '/all' },
  //   { title: 'My favorites', url: '/my' },
  //   { title: 'Popular', url: '/popular' },
  // ];

  // const onChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   console.log({ event });
  // };

  // const inputValues = {
  //   value: 'Text',
  //   type: 'text' as 'text',
  //   error: '',
  //   labelText: 'User name',
  //   placeholder: 'Placeholder',
  //   disabled: false,
  //   // onChange,
  // };

  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a> */}
      <FormTemplate title="Sign in">
        <p>Hello</p>
        {/* <Container>
          <Footer />
        </Container> */}
      </FormTemplate>
      {/* <Container>
          <Footer />
        </Container> */}

      {/* <Tabs list={tabs} activeTabUrl={'/my'} />
        <Input onChange={(event) => onChange(event)} {...inputValues} error={'Text error'} />
        <Input onChange={(event) => onChange(event)} {...inputValues} disabled />
        <Input onChange={(event) => onChange(event)} {...inputValues} value={''} />
        <Input
          onChange={(event) => onChange(event)}
          {...inputValues}
          value={'password'}
          type={'password'}
        />
        <Button theme={'primary'} text="Button example" onClick={onClick} />
        <Button theme={'secondary'} text="Button example" onClick={onClick} />
        <Button theme={'primary'} text="Button example" onClick={onClick} disabled={true} />
        <Button theme={'delete'} text="Button example" onClick={onClick} />
        <Button
          theme={'icon'}
          text="Button example"
          onClick={onClick}
          icon={<FavoriteIconStyled />}
        /> */}
      {/* </header> */}
    </div>
  );
}

// const FavoriteIconStyled = styled(FavoriteIcon)`
//   path {
//     fill: ${ColorService.SECONDARY};
//   }
// `;

export default App;
