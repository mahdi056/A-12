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
import Modprofile from './Components/Moderator/Modprofile';
import Managescholarships from './Components/Moderator/Managescholarships';
import Allreviews from './Components/Moderator/Allreviews';
import Allappliedscholarships from './Components/Moderator/Allappliedscholarships';
import Addscholarship from './Components/Moderator/Addscholarship';
import Adminprofile from './Components/Admin/Adminprofile';
import Adminaddscholars from './Components/Admin/Adminaddscholars';
import Adminmngscho from './Components/Admin/Adminmngscho';
import Adminmngappscho from './Components/Admin/Adminmngappscho';
import Manageusers from './Components/Admin/Manageusers';
import Managereviews from './Components/Admin/Managereviews';
import Chart from './Components/Admin/Chart';
import Contactus from './Components/Contactus';
import Aboutus from './Components/Aboutus';
import Userchart from './Components/User/Userchart';



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
      {
        path: '/contactus',
        element: <Contactus></Contactus>
      },
      {
        path: '/aboutus',
        element: <Aboutus></Aboutus>
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
        path: 'userchart',
        element: <Userchart></Userchart>
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
      },
      {
        path: 'modprofile',
        element: <Modprofile></Modprofile>,
      },
      {
        path: 'managescholarships',
        element: <Managescholarships></Managescholarships>
      },
      {
        path: 'allreviews',
        element: <Allreviews></Allreviews>
      },
      {
        path: 'allappliedscholarships',
        element: <Allappliedscholarships></Allappliedscholarships>
      },
      {
        path: 'addscholarship',
        element: <Addscholarship></Addscholarship>
      },
     
      {
        path: 'adminprofile',
        element: <Adminprofile></Adminprofile>
      },
      {
        path: 'adminaddscholars',
        element: <Adminaddscholars></Adminaddscholars>,
      },
      {
        path: 'adminmngscho',
        element: <Adminmngscho></Adminmngscho>
      },
      {
        path: 'adminmngappscho',
        element: <Adminmngappscho></Adminmngappscho>
      },
      {
        path: 'manageusers',
        element: <Manageusers></Manageusers>
      },
      {
        path: 'managereviews',
        element: <Managereviews></Managereviews>
      },
      {
        path: 'chart',
        element: <Chart></Chart>
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
