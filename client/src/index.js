import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from "./pages/Dashboard.jsx"
import User from "./pages/User.jsx"
import Role from "./pages/Role.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Dashboard/>
      },
      {
        path: "/userManagment",
        element: <User/>
      },
      {
        path: "/roleManagment",
        element: <Role/>
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
