import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Posts } from './posts/Posts';
import { Layout } from './components/Layout';
import { NotFound } from './components/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Posts />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;
