import { FC, useState } from 'react';
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

export const Posts: FC = () => {
  const [posts, setPosts] = useState<TPost[]>([]);

  const handleSubmit = (name: string, text: string) => {
    setPosts(currentPosts => [{ id: currentPosts.length + 1, name, text, publishedAt: new Date() }, ...currentPosts]);
  };

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
        <PostForm onSubmit={handleSubmit} />
        <section className="space-y-4">{posts.length > 0 && <PostList posts={posts} />}</section>
      </section>
    </>
  );
};
