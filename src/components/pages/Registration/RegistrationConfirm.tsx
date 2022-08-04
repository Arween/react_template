import { ReactNode, ChangeEvent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../atoms/Button';
import { sendRegistrationConfirmAction } from '../../../core/slices/authSlice';
import { IUserConfirm } from '../../../types/user';
//   author: number;
//   date: string;
//   id: number;
//   image: string;
//   lesson_num: number;
//   text: string;
//   title: string;
//   isFavorite: boolean;
// }

// interface IPostsInfo {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: IPost[];
// }

export const RegistrationConfirm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  console.log({ params });

  useEffect(() => {
    const uid = params?.uid;
    if (uid) {
      // const { uid, token } = params;
      dispatch(
        sendRegistrationConfirmAction({
          uid: params?.uid as string,
          token: params?.token as string,
        }),
      );
    }
  }, [dispatch, params, params?.uid]);

  return (
    // <FormTemplate title="Sign in">
    <>
      <button onClick={() => navigate('/posts')}>Home</button>
    </>
    // </FormTemplate>
  );
};

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const List = styled.ul``;

const Li = styled.li``;

const TabsOrdering = styled.ul`
  display: flex;
  flex-direction: row;

  li {
    padding: 20px;
    border: 1px solid black;
    margin: 4px;
  }
`;

const LiPost = styled.li`
  border: 1px solid black;
  padding: 3px;
`;
