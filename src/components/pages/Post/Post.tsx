import { ReactNode, ChangeEvent, useState, useEffect } from 'react';
import { useSearchParams, useParams, useLocation } from 'react-router-dom';

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

export const PostPage = () => {
  // const [sendedUser, setSendedUser] = useState(false);

  const [post, setPost] = useState<IPost>();

  const params = useParams();

  useEffect(() => {
    const id = params?.postID;
    if (id) {
      fetch(`https://studapi.teachmeskills.by/blog/posts/${id}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setPost(data);
        });
    }
  }, [params?.postID]);

  // console.log(posts);
  return (
    // <FormTemplate title="Sign in">
    <>
      Posts
      <List>
        <Li>
          {post?.date} - {post?.title}
        </Li>
        {/* {posts?.results?.map(({ date, title, id }) => (
          <Li key={id}>
            {date} - {title}
          </Li>
        ))} */}
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
