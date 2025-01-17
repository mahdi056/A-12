import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,

  Navigate,

  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root';
import Home from './Components/Home';
import AllScholarships from './Components/AllScholarships';
import Errorpage from './Components/Errorpage';
import Login from './Components/Login';
import Registration from './Components/Regisration';
import Authprovider from './Components/Authprovider/Authprovider';
import ScholarshipDetails from './Components/ScholarshipDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Errorpage></Errorpage>,
    children: [
      {
        path: '/',
        element: <Navigate to='/home' relative={true}></Navigate>
      },
      {
        path: '/home',
        element: <Home></Home>
      },
      {
        path: '/allscholarship',
        element: <AllScholarships></AllScholarships>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/registration',
        element: <Registration></Registration>
      },
      {
        path: '/scholarshipdetails/:id',
        element: <ScholarshipDetails></ScholarshipDetails>,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <RouterProvider router={router} />
    </Authprovider>
  </StrictMode>,
)
