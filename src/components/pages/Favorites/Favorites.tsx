import { ReactNode, ChangeEvent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';
import {
  showPosts,
  getPostsAsync,
  removePosts,
  toggleFavorite,
} from '../../../core/slices/postsSlice';
import { IPostsInfo } from '../../../types/posts';
import { Input } from '../../atoms/Input';
import { Modal } from '../../templates/Modal/Modal';

// interface IPost {
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

export const FavoritesPage = () => {
  // const [sendedUser, setSendedUser] = useState(false);

  const { posts } = useSelector(showPosts);
  //  // console.log('FavoritesPage', { postsStore });
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);

  // const [posts, setPosts] = useState<IPostsInfo>();
  const [postsV2, setPostsV2] = useState<IPostsInfo>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [orderingValue, setOrderingValue] = useState<string>('');

  const onChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    setSearchValue(event.target.value);
  };

  const searchInput = {
    value: searchValue,
    error: '',
    type: 'text' as 'text',
    labelText: 'Search',
    placeholder: 'Placeholder',
    disabled: false,
  };

  const onBlur = () => {};

  const fields = [
    {
      fieldName: 'lesson_num',
      name: 'Lesson number',
    },
    {
      fieldName: 'date',
      name: 'Date',
    },
    {
      fieldName: 'Title',
      name: 'title',
    },
    {
      fieldName: 'author',
      name: 'Author ID',
    },
  ];

  const onChangeOrdering = (field: string) => {
    // console.log({ field });
    setOrderingValue(field);
  };

  const onClose = () => {
    setHidden(true);
  };

  return (
    // <FormTemplate title="Sign in">
    <>
      <button onClick={() => dispatch(removePosts())}>Clear posts</button>
      Posts:
      <TabsOrdering>
        {fields.map(({ fieldName, name }) => (
          <Li key={fieldName} onClick={() => onChangeOrdering(fieldName)}>
            {name}
          </Li>
        ))}
      </TabsOrdering>
      <Input
        {...searchInput}
        onChange={(event) => onChange(event, 'searchValue')}
        onBlur={onBlur}
      />
      <List>
        {posts?.results?.map(({ date, title, id, lesson_num, author, isFavorite }) => (
          <>
            {isFavorite ? (
              <LiPost key={id}>
                <p>Favorite: {isFavorite ? 'yes' : 'no'}</p>
                <button onClick={() => dispatch(toggleFavorite(id))}>
                  {isFavorite ? 'Remove' : 'Add'}
                </button>
                date: {date} - title: {title} - lesson_num: {lesson_num} - author: {author}
              </LiPost>
            ) : null}
          </>
        ))}
      </List>
      {!hidden && (
        <Modal onClose={onClose}>
          <p>Hello</p>
        </Modal>
      )}
      <button onClick={() => setHidden(false)}>Open Modal</button>
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
