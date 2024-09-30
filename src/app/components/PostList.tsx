import { FC } from 'react';
import { PostItem } from './PostItem';
import { TPost } from '../types';

interface IPostListProps {
  posts: TPost[];
  isLoading?: boolean;
}

export const PostList: FC<IPostListProps> = ({ posts, isLoading = false }) => {
  let result = <div className="text-gray-500">No posts found</div>;

  if (isLoading) {
    result = <div>Loading...</div>;
  } else if (posts.length > 0 && !isLoading) {
    result = (
      <ul>
        {posts.map(({ id, name, publishedAt, text }) => (
          <PostItem key={id} name={name} publishedAt={publishedAt} text={text} hasExactDate />
        ))}
      </ul>
    );
  }

  return <section className="space-y-4">{result}</section>;
};
