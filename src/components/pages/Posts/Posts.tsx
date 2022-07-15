import { ReactNode, ChangeEvent, useState, useEffect } from 'react';

import styled from 'styled-components';

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

  useEffect(() => {
    console.log('useEffect');
    fetch('https://studapi.teachmeskills.by/blog/posts/?limit=20')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, []);

  // console.log(posts);
  return (
    // <FormTemplate title="Sign in">
    <>
      Posts
      <List>
        {posts?.results?.map(({ date, title, id }) => (
          <Li key={id}>
            {date} - {title}
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
