import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HeadProvider } from 'react-head';
import App from './App.tsx'
import Slogan from './Slogan.tsx';
import PrivacyPolicy from './PrivacyPolicy.tsx';
import './index.css';
import './theme.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/slogan/:sloganId",
    element: <Slogan />,
  },
  {
    path: "/zasady-ochrany-osobnych-udajov",
    element: <PrivacyPolicy />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HeadProvider>
      <RouterProvider router={router} />
    </HeadProvider>
  </React.StrictMode>,
)
