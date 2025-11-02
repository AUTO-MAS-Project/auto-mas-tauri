import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CustomHeader from '../components/CustomHeader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/popup',
    element: <PopupLayout />,
    children: [
      {
        path: '/popup',
          element: <HomePage />,
      },
    ],
  },
]);

function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <CustomHeader />
      <Outlet />
    </div>
  );
}

function PopupLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Outlet />
    </div>
  );
}

export const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};