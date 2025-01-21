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
import Dashboard from './Components/Dashboard';
import Payment from './Components/Payment/Payment';
import Myprofile from './Components/User/Myprofile';
import Myapplication from './Components/User/Myapplication';
import Myreviews from './Components/User/Myreviews';
import EditApplication from './Components/User/EditApplication';

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
      },
      
      {
        path: '/payment',
        element: <Payment></Payment>
      },
     
      
    ],

    
  },

  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'myprofile',
        element: <Myprofile></Myprofile>,
      },
      {
        path:'myapplication',
        element: <Myapplication></Myapplication>
      },
      {
        path: 'myreviews',
        element: <Myreviews></Myreviews>
      },
      {
        path: 'edit-application/:id',
        element: <EditApplication></EditApplication>
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
