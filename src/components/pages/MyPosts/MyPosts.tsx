import { ReactNode, ChangeEvent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';
import {
  showPosts,
  getPostsAsync,
  removePosts,
  toggleFavorite,
  getMyPostsAction,
} from '../../../core/slices/postsSlice';
import { IPostsInfo } from '../../../types/posts';
import { Input } from '../../atoms/Input';
import { ETypeInput } from '../../atoms/Input/Input';
import { Modal } from '../../templates/Modal/Modal';

export const MyPosts = () => {
  // const [sendedUser, setSendedUser] = useState(false);

  const { myPosts } = useSelector(showPosts);
  //  // console.log('FavoritesPage', { postsStore });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPostsAction());
  }, [dispatch]);

  return (
    // <FormTemplate title="Sign in">
    <>
      <List>
        {myPosts?.map(({ date, title, id, lesson_num, author }) => (
          <LiPost key={id}>
            date: {date} - title: {title} - lesson_num: {lesson_num} - author: {author}
          </LiPost>
        ))}
      </List>
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
