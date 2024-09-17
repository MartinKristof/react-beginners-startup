import { FC, useActionState, useState } from 'react';
import { FormGroup } from './components/FormGroup';
import { PostList } from './components/PostList';
import { TPost } from './types';

const data = [
  {
    id: 1,
    name: 'John Doe the First of His Name and the Last of His Kind',
    publishedAt: new Date(),
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.',
  },
  {
    id: 2,
    name: 'John Doe',
    publishedAt: new Date(),
    text: 'Foo.',
  },
];

const DEFAULT_FORM_STATE = { name: '', text: '', errors: { name: '', text: '' } };

const validateForm = (name: string, text: string) => {
  const errors = { ...DEFAULT_FORM_STATE.errors };

  if (!name.trim().length) {
    errors.name = 'Name is required';
  } else if (name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters long';
  }

  if (!text.trim().length) {
    errors.text = 'Text is required';
  } else if (text.trim().length < 3) {
    errors.text = 'Text must be at least 3 characters long';
  }

  return errors;
};

export const Posts: FC = () => {
  const [posts, setPosts] = useState<TPost[]>(data);
  const [state, submitAction] = useActionState<
    { name: string; text: string; errors: { name: string; text: string } },
    FormData
  >(
    (_, payload) => {
      const text = payload.get('text') as string;
      const name = payload.get('name') as string;

      const errors = validateForm(name, text);

      if (errors.name || errors.text) {
        return { text, name, errors };
      }

      setPosts(currentPosts => [{ id: currentPosts.length + 1, name, text, publishedAt: new Date() }, ...currentPosts]);

      return { ...DEFAULT_FORM_STATE };
    },
    { ...DEFAULT_FORM_STATE },
  );

  const {
    errors: { name: nameError, text: textError },
    name: nameValue,
    text: textValue,
  } = state;

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
        <form action={submitAction}>
          <div>
            <FormGroup label="Your name" id="name" error={nameError}>
              <input
                type="text"
                className="w-full px-4 py-2 border border-
gray-300 rounded-md shadow-sm focus:outline-none focus:ring-
indigo-500 focus:border-indigo-500"
                name="name"
                id="name"
                placeholder="Your name"
                defaultValue={nameValue}
              />
            </FormGroup>
            <FormGroup label="Your post" id="text" error={textError}>
              <textarea
                id="text"
                name="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Some post"
                rows={4}
                defaultValue={textValue}
              />
            </FormGroup>
          </div>
          <div className="mt-2">
            <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
              Submit
            </button>
          </div>
        </form>
        <section className="space-y-4">
          <PostList posts={posts} />
        </section>
      </section>
    </>
  );
};
