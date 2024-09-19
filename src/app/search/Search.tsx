import { FC } from 'react';

export const Search: FC = () => (
  <>
    <div className="w-1/3">
      <div className="mt-2">
        <form>
          <label htmlFor="search" className="block mb-2 text-sm font-medium">
            Search:
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              name="search"
              id="search"
              placeholder="Search..."
              defaultValue="john"
            />
          </label>
        </form>
      </div>
    </div>
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
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis condimentum augue id magna semper rutrum.
                Pellentesque arcu. Etiam dictum tincidunt diam. In rutrum. Morbi scelerisque luctus velit. Null...
              </p>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </>
);
