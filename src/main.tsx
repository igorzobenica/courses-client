import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import { NotFoundPage } from './pages/NotFoundPage.tsx';
import { CourseForm } from './pages/CourseForm.tsx';
import CourseList from './pages/CourseList.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/courses",
    element: <CourseList />,
  },
  {
    path: "/courses/:id",
    element: <CourseForm />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
