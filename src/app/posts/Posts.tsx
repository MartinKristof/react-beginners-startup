import { useState } from 'react';

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
            <li>
              <div className="p-4 border border-stone-700 rounded my-3 flex justify-between gap-5 items-start">
                <div className="flex-none">
                  <div className="flex-row">
                    <div>
                      <strong>John Doe the First o...</strong>
                    </div>
                    <div>
                      <em>10. 2. 2024 - 21:17:41</em>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-ellipsis overflow-hidden">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis condimentum augue id magna semper
                    rutrum. Pellentesque arcu. Etiam dictum tincidunt diam. In rutrum. Morbi scelerisque luctus velit.
                    Null...
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </section>
    </>
  );
};
