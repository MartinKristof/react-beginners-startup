import { FC, useEffect } from 'react';
import { PostList } from '../components/PostList';
import { PostForm } from './components/PostForm';
import { useApi } from '../hooks/useApi';

export const Posts: FC = () => {
  const { posts, loading, apiError, getData, postData } = useApi();

  const handleSubmit = async (name: string, text: string) => {
    await postData({ name, text, publishedAt: new Date().getTime() });

    await getData();
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getData(signal);

    return () => {
      controller.abort();
    };
  }, [getData]);

  return (
    <>
      <title>{`Posts - ${posts.length ? `See ${posts.length} posts` : 'No Posts'}`}</title>
      <PostForm onSubmit={handleSubmit} apiError={apiError} />
      <PostList posts={posts} isLoading={loading} />
    </>
  );
};
