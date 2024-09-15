import { useState } from 'react';

const data = [
  {
    id: 1,
    name: 'John Doe',
    publishedAt: '2024-01-01',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.',
  },
  {
    id: 2,
    name: 'John Doe',
    publishedAt: '2024-01-02',
    text: 'Foo.',
  },
];

export const Posts = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

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
        <form>
          <div>
            <div className="mt-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Your name:
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  name="name"
                  id="name"
                  onChange={event => setName(event.target.value)}
                  placeholder="Your name"
                  value={name}
                />
              </label>
            </div>
            <div className="mt-2">
              <label htmlFor="text" className="block mb-2 text-sm font-medium">
                Your post:
                <textarea
                  id="text"
                  name="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Some post"
                  onChange={event => setText(event.target.value)}
                  rows={4}
                  value={text}
                />
              </label>
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
            {data.map(({ id, name: author, publishedAt, text: content }) => (
              <li key={id}>
                <div className="p-4 border border-stone-700 rounded my-3 flex justify-between gap-5 items-start">
                  <div className="flex-none">
                    <div className="flex-row">
                      <div>
                        <strong>{author}</strong>
                      </div>
                      <div>
                        <em>{publishedAt}</em>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-ellipsis overflow-hidden">{content}</p>
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
