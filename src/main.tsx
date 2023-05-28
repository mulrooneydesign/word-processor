import ReactDOM from 'react-dom/client';
import App from './App';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SavedDocuments from './components/SavedDocuments/SavedDocuments';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/sign-up',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/saved-documents',
    element: <SavedDocuments />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
);
