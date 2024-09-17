import { FC } from 'react';
import { PostItem } from './PostItem';
import { TPost } from '../types';

interface IPostListProps {
  posts: TPost[];
}

export const PostList: FC<IPostListProps> = ({ posts }) => (
  <ul>
    {posts.map(({ id, name, publishedAt, text }) => (
      <PostItem key={id} name={name} publishedAt={publishedAt} text={text} />
    ))}
  </ul>
);
