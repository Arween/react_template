import { ReactNode, ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import {
  validateEmail,
  validateName,
  validatePassword,
  validateConfirmPassword,
} from '../../../libs/validation';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { FormTemplate } from '../../templates/FormTemplate/FormTemplate';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: {
      value: '',
      error: '',
      // required: false,
    },
    email: {
      value: '',
      error: '',
      // required: true,
    },
    password: {
      value: '',
      error: '',
      // required: true,
    },
    confirmPassword: {
      value: '',
      error: '',
      // required: true,
    },
  });

  const [sendedUser, setSendedUser] = useState(false);

  const { username, email, password, confirmPassword } = user;

  useEffect(() => {
    if (sendedUser) {
      navigate('/posts');
    }
  }, [navigate, sendedUser]);

  const onChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    setUser({
      ...user,
      [field]: {
        value: event.target.value,
        error: '',
      },
    });
  };

  const onBlur = (field: string) => {
    console.log('onBlur', field);
    if (field === 'email') {
      const isValidEmail = validateEmail(email.value);
      setUser({
        ...user,
        [field]: {
          value: user[field].value,
          error: isValidEmail ? '' : 'Invalid email',
        },
      });
    }

    if (field === 'username') {
      const isValidUsername = validateName(username.value);
      setUser({
        ...user,
        [field]: {
          value: user[field].value,
          error: isValidUsername ? '' : 'Username should be more than 1',
        },
      });
    }

    if (field === 'password') {
      const isValidPassword = validatePassword(password.value);
      setUser({
        ...user,
        [field]: {
          value: user[field].value,
          error: isValidPassword ? '' : 'Password should be more than 7',
        },
      });
    }

    if (field === 'confirmPassword') {
      const isValidConfirmPassword = validateConfirmPassword(password.value, confirmPassword.value);
      setUser({
        ...user,
        [field]: {
          value: user[field].value,
          error: isValidConfirmPassword ? '' : 'confirmPassword !== password',
        },
      });
    }
  };

  const sendUser = () => {
    setSendedUser(true);
  };

  const inputValues = {
    value: username.value,
    type: 'text' as 'text',
    error: username.error,
    labelText: 'Username',
    placeholder: 'Placeholder',
    disabled: false,
  };

  // const isValidUser = () =>
  //   Object.values(user).reduce((acc, { value, error }: { value: string; error: string }) => {
  //     // const fieldObject = user[field];
  //     return value.length && !error.length;
  //   }, true);

  return (
    <>
      {/* <FormTemplate title="Sign in"> */}
      <InputWrapper>
        <Input
          onBlur={() => onBlur('username')}
          onChange={(event) => onChange(event, 'username')}
          {...inputValues}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          onBlur={() => onBlur('email')}
          onChange={(event) => onChange(event, 'email')}
          {...inputValues}
          labelText="Email"
          value={email.value}
          error={email.error}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          onBlur={() => onBlur('password')}
          onChange={(event) => onChange(event, 'password')}
          {...inputValues}
          labelText="Password"
          type="password"
          value={password.value}
          error={password.error}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          onBlur={() => onBlur('confirmPassword')}
          onChange={(event) => onChange(event, 'confirmPassword')}
          {...inputValues}
          labelText="Confirm password"
          type="password"
          value={confirmPassword.value}
          error={confirmPassword.error}
        />
      </InputWrapper>
      <Button text="Sign Up" theme="primary" onClick={() => sendUser()} />

      {/* </FormTemplate> */}
    </>
  );
};

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const List = styled.ul``;
