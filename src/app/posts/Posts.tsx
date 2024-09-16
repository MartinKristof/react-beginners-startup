import { useActionState, useState } from 'react';

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

const truncate = (text: string, length = 20) => (text.length > length ? `${text.substring(0, length)}...` : text);

const formatDate = (date: Date) => `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;

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

export const Posts = () => {
  const [posts, setPosts] = useState(data);
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
            <div className="mt-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Your name:
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  name="name"
                  id="name"
                  placeholder="Your name"
                  defaultValue={nameValue}
                />
              </label>
              <div className="text-red-500">{nameError}</div>
            </div>
            <div className="mt-2">
              <label htmlFor="text" className="block mb-2 text-sm font-medium">
                Your post:
                <textarea
                  id="text"
                  name="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Some post"
                  rows={4}
                  defaultValue={textValue}
                />
              </label>
              <div className="text-red-500">{textError}</div>
            </div>
          </div>
          <div className="mt-2">
            <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
              Submit
            </button>
          </div>
        </form>
        <section className="space-y-4">
          <ul>
            {posts.map(({ id, name: author, publishedAt, text: content }) => (
              <li key={id}>
                <div className="p-4 border border-stone-700 rounded my-3 flex justify-between gap-5 items-start">
                  <div className="flex-none w-32">
                    <div className="flex-row">
                      <div>
                        <strong>{truncate(author)}</strong>
                      </div>
                      <div>
                        <em>{formatDate(publishedAt)}</em>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-ellipsis overflow-hidden">{truncate(content, 200)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </>
  );
};
