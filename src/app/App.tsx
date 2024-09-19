import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Posts } from './posts/Posts';

const router = createBrowserRouter([
  { path: '/', element: <Posts /> },
  { path: '*', element: <div>Page Not Found</div> },
]);

export const App = () => <RouterProvider router={router} />;
