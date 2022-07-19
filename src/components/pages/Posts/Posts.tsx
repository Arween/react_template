import { ReactNode, ChangeEvent, useState, useEffect } from 'react';

import styled from 'styled-components';
import { Input } from '../../atoms/Input';

interface IPost {
  author: number;
  date: string;
  id: number;
  image: string;
  lesson_num: number;
  text: string;
  title: string;
}

interface IPostsInfo {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPost[];
}

export const PostsPage = () => {
  // const [sendedUser, setSendedUser] = useState(false);

  const [posts, setPosts] = useState<IPostsInfo>();
  const [postsV2, setPostsV2] = useState<IPostsInfo>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [orderingValue, setOrderingValue] = useState<string>('');

  useEffect(() => {
    fetch(
      `https://studapi.teachmeskills.by/blog/posts/?limit=20&search=${searchValue}&ordering=${orderingValue}`,
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
        // setPostsV2(data);
      });
  }, [searchValue, orderingValue]);

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
    console.log({ field });
    setOrderingValue(field);
  };

  return (
    // <FormTemplate title="Sign in">
    <>
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
        {posts?.results?.map(({ date, title, id, lesson_num, author }) => (
          <Li key={id}>
            date: {date} - title: {title} - lesson_num: {lesson_num} - author: {author}
          </Li>
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
