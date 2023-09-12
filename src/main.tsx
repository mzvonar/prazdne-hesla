import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import Slogan from './Slogan.tsx';
import PrivacyPolicy from './PrivacyPolicy.tsx';
import './index.css'

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
    <RouterProvider router={router} />
  </React.StrictMode>,
)
