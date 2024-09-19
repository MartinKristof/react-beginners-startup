import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout: FC = () => (
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
      <Outlet />
    </section>
  </>
);
