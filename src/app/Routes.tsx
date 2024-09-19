import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { NotFound } from './components/NotFound';
import { Posts } from './posts/Posts';
import { Search } from './search/Search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Posts />,
      },
      { path: 'search', element: <Search /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export const Routes = () => <RouterProvider router={router} />;
