import { FC } from 'react';
import { PostList } from '../components/PostList';
import { PostForm } from './components/PostForm';
import { usePosts } from './hooks/usePosts';

export const Posts: FC = () => {
  const { posts, loading, apiError, handleSubmit } = usePosts();

  return (
    <>
      <title>{`Posts - ${posts.length ? `See ${posts.length} posts` : 'No Posts'}`}</title>
      <PostForm onSubmit={handleSubmit} apiError={apiError} />
      <PostList posts={posts} isLoading={loading} />
    </>
  );
};
