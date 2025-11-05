import React from 'react';
import { createBrowserRouter, NavLink, Outlet, RouterProvider, useLocation } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CustomHeader from '../components/CustomHeader';
import SettingsPage from '../pages/SettingsPage.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/setting',
                element: <SettingsPage />,
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
    const location = useLocation();
    
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
            <CustomHeader />
            <nav className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            `px-4 py-3 text-sm font-medium transition-colors ${
                                isActive 
                                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' 
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`
                        }
                    >
                        首页
                    </NavLink>
                    <NavLink 
                        to="/setting" 
                        className={({ isActive }) => 
                            `px-4 py-3 text-sm font-medium transition-colors ${
                                isActive 
                                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' 
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`
                        }
                    >
                        设置
                    </NavLink>
                </div>
            </nav>
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