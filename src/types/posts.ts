export interface IPost {
  author: number;
  date: string;
  id: number;
  image: string;
  lesson_num: number;
  text: string;
  title: string;
  isFavorite: boolean;
}

export interface IPostsInfo {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPost[];
}
