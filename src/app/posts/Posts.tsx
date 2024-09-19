import { FC, useEffect, useState } from 'react';
import { PostList } from './components/PostList';
import { TPost } from './types';
import { PostForm } from './components/PostForm';

// const data = [
//   {
//     id: 1,
//     name: 'John Doe the First of His Name and the Last of His Kind',
//     publishedAt: new Date(),
//     text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.',
//   },
//   {
//     id: 2,
//     name: 'John Doe',
//     publishedAt: new Date(),
//     text: 'Foo.',
//   },
// ];

const API_URL = import.meta.env.VITE_API_URL;

const getUrl = () => {
  const url = new URL(API_URL);

  url.searchParams.append('_sort', 'id');
  url.searchParams.append('_order', 'desc');

  return url;
};

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
      <nav className="flex justify-start items-center bg-red-950 px-8 py-3 h-20">
        <ul className="flex">
          <li className="mr-6">
            <a aria-current="page" className="text-white font-bold hover:underline underline" href="/">
              Posts
            </a>
          </li>
          <li className="mr-6">
            <a className="text-white font-bold hover:underline" href="/search">
              Search
            </a>
          </li>
        </ul>
      </nav>
      <section className="py-3 container mx-auto px-4 flex flex-col space-y-4 text-left">
        <PostForm onSubmit={handleSubmit} apiError={apiError} />
        <section className="space-y-4">
          {loading ? <div>Loading...</div> : posts.length > 0 && <PostList posts={posts} />}
        </section>
      </section>
    </>
  );
};
