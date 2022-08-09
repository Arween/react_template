import { ImageType } from 'react-images-uploading';

export interface IPost {
  author: number;
  date: string;
  id: number;
  image: string;
  lesson_num: number;
  text: string;
  title: string;
  isFavorite: boolean;
  likes: number;
  dislikes: number;
}

export interface IPostsInfo {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPost[];
}

export interface IPostSendRequest {
  image: ImageType;
  text: string;
  lesson_num: number;
  title: string;
}
