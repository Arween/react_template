import { ReactNode, ChangeEvent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';
import {
  showPosts,
  getPostsAsync,
  removePosts,
  toggleFavorite,
  getIsShowModalPost,
  getSelectedPost,
  setIsShowModalPost,
  setSelectedPost,
  getSelectedPosts,
  setIsEditMode,
  setSelectedPostsList,
  setIsShowModalPostsList,
  likePost,
  dislikePost,
  setSearchValue,
  setOrderingValue,
} from '../../../core/slices/postsSlice';
import { IPost, IPostsInfo } from '../../../types/posts';
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

export const PostsPage = () => {
  // const [sendedUser, setSendedUser] = useState(false);

  const { posts, searchValue, orderingValue } = useSelector(showPosts);
  const isShowModalPost = useSelector(getIsShowModalPost);
  const selectedPost = useSelector(getSelectedPost);
  const { selectedPostsList, isShowModalPostsList, isEditMode } = useSelector(getSelectedPosts);
  // console.log({ postsStore, selectedPostsList, isShowModalPostsList });
  const dispatch = useDispatch();

  // const [posts, setPosts] = useState<IPostsInfo>();
  const [postsV2, setPostsV2] = useState<IPostsInfo>();
  // const [searchValue, setSearchValue] = useState<string>('');
  // const [orderingValue, setOrderingValue] = useState<string>('');

  const [postsLocal, setPostsLocal] = useState<IPost[]>();

  useEffect(() => {
    dispatch(getPostsAsync({ searchValue, orderingValue }) as any);
    // fetch(
    //   `https://studapi.teachmeskills.by/blog/posts/?limit=20&search=${searchValue}&ordering=${orderingValue}`,
    // )
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setPosts(data);
    //     // setPostsV2(data);
    //   });
  }, [searchValue, orderingValue, dispatch]);

  // useEffect(() => {
  //   console.log('useEffect 2');
  //   if (searchValue.length) {
  //     const newPosts = posts?.results.filter(
  //       (post: IPost) => post.title.indexOf('searchValue') !== -1,
  //     );
  //     // const newPosts = posts?.results.reduce((acc, ))
  //     if (newPosts) {
  //       setPostsV2({ ...posts, results: newPosts } as IPostsInfo);
  //     }
  //   }
  // }, [posts, searchValue]);

  const onChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    dispatch(setSearchValue(event.target.value));
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
    console.log({ field });
    dispatch(setOrderingValue(field));
  };

  const onSelectPost = (post: IPost) => {
    dispatch(setSelectedPost(post));
    dispatch(setIsShowModalPost(true));
  };

  const onSelectPostLocal = (post: IPost) => {
    if (isEditMode) {
      setPostsLocal(postsLocal ? [...postsLocal, post] : [post]);
    }
  };

  const sendPosts = () => {
    dispatch(setSelectedPostsList(postsLocal));
    dispatch(setIsEditMode(false));
    setPostsLocal([]);
  };

  return (
    // <FormTemplate title="Sign in">
    <>
      Edit mode: {isEditMode ? 'On' : 'Off'}
      <button onClick={() => dispatch(setIsEditMode(!isEditMode))}>Toggle edit mode</button>
      <button onClick={sendPosts}>Send posts(Redux)</button>
      <button onClick={() => dispatch(setIsShowModalPostsList(true))}>Show posts(Modal)</button>
      {postsLocal?.map(({ id }) => (
        <Li key={id}>{id}</Li>
      ))}
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
        {posts?.results?.map(
          ({ date, title, id, lesson_num, author, isFavorite, likes, dislikes, ...res }) => (
            <LiPost key={id}>
              id: {id} - title: {title}
              <button onClick={() => dispatch(likePost(id))}>Like: {likes}</button>
              <button onClick={() => dispatch(dislikePost(id))}>Dislike: {dislikes}</button>
              <button
                onClick={() =>
                  onSelectPostLocal({
                    date,
                    title,
                    id,
                    lesson_num,
                    author,
                    isFavorite,
                    likes,
                    dislikes,
                    ...res,
                  })
                }>
                Select local posts
              </button>
              <button
                onClick={() =>
                  onSelectPost({
                    date,
                    title,
                    id,
                    lesson_num,
                    author,
                    isFavorite,
                    likes,
                    dislikes,
                    ...res,
                  })
                }>
                Select post(1)
              </button>
              <div>
                <button onClick={() => dispatch(toggleFavorite(id))}>
                  {isFavorite ? 'Remove' : 'Add'}
                </button>
                <p>Favorite: {isFavorite ? 'yes' : 'no'}</p>
              </div>
              date: {date} - title: {title} - lesson_num: {lesson_num} - author: {author}
            </LiPost>
          ),
        )}
      </List>
      {isShowModalPost && (
        <Modal onClose={() => dispatch(setIsShowModalPost(false))}>
          {selectedPost?.image && <Image src={selectedPost?.image} alt="Image" />}
        </Modal>
      )}
      {isShowModalPostsList && (
        <Modal onClose={() => dispatch(setIsShowModalPostsList(false))}>
          {selectedPostsList?.map(({ date, title, id, lesson_num, author, isFavorite, ...res }) => (
            <LiPost key={id}>
              id: {id} - title: {title}
            </LiPost>
          ))}
        </Modal>
      )}
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

const Image = styled.img`
  height: 100px;
  width: 100px;
`;
