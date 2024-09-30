import { FC, useEffect, useState } from 'react';
import { PostList } from '../components/PostList';
import { TPost } from '../types';
import { PostForm } from './components/PostForm';
import { getUrl } from '../utils/getUrl';

export const Posts: FC = () => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (signal?: AbortSignal) => {
    setLoading(true);
    try {
      const response = await fetch(getUrl(), { signal });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = (await response.json()) as TPost[];
      setPosts(data);
    } catch (error) {
      setApiError(`Failed to fetch posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (name: string, text: string) =>
    fetch(getUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, text, publishedAt: new Date().getTime() }),
    });

  const handleSubmit = async (name: string, text: string) => {
    try {
      const response = await addPost(name, text);

      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      setApiError(`Failed to add post: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
    fetchPosts();
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchPosts(signal);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <title>{`Posts - ${posts.length ? `See ${posts.length} posts` : 'No Posts'}`}</title>
      <PostForm onSubmit={handleSubmit} apiError={apiError} />
      <section className="space-y-4">
        {loading ? <div>Loading...</div> : posts.length > 0 && <PostList posts={posts} />}
      </section>
    </>
  );
};
