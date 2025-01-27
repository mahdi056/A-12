import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from './Authprovider/Authprovider';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext); 
  const [currentUserRole, setCurrentUserRole] = useState('');

  useEffect(() => {
    // Fetch all users from your backend
    axios
      .get('https://a-12-server-side-gold.vercel.app/users')
      .then((res) => {
        
        const loggedInUser = res.data.find((u) => u.email === user.email);
        
    
        if (loggedInUser) {
          setCurrentUserRole(loggedInUser.role);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [user.email]); 
  
  

 
// console.log(currentUserRole);
 

 
 

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-green-600 text-white flex flex-col items-start py-8 px-4 shadow-lg">
        <h2 className="text-lg md:text-2xl font-bold mb-6 self-center">Dashboard</h2>
       

        {
          user && currentUserRole !== 'moderator' && currentUserRole !== 'admin' && (
            <>

              <NavLink
                to="/home"
                className="mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left"
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard/myprofile"
                className={({ isActive }) =>
                  `mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left ${isActive ? "bg-black font-bold" : ""
                  }`
                }
              >
                My Profile
              </NavLink>
              <NavLink
                to="/dashboard/myapplication"
                className={({ isActive }) =>
                  `mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left ${isActive ? "bg-black font-bold" : ""
                  }`
                }
              >
                My Application
              </NavLink>
              <NavLink
                to="/dashboard/myreviews"
                className={({ isActive }) =>
                  `mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left ${isActive ? "bg-black font-bold" : ""
                  }`
                }
              >
                My Reviews
              </NavLink>



            </>
          )

        }
        {
          user && currentUserRole === 'moderator' && (
            <>

              <NavLink
                to="/home"
                className="mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left"
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard/modprofile"
                className={({ isActive }) =>
                  `mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left ${isActive ? "bg-black font-bold" : ""
                  }`
                }
              >
                My Profile
              </NavLink>
              <NavLink
                to="/dashboard/managescholarships"
                className={({ isActive }) =>
                  `mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left ${isActive ? "bg-black font-bold" : ""
                  }`
                }
              >
                Manage Scholarships
              </NavLink>
              <NavLink
                to="/dashboard/allreviews"
                className={({ isActive }) =>
                  `mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left ${isActive ? "bg-black font-bold" : ""
                  }`
                }
              >
                All Reviews
              </NavLink>

              <NavLink
                to="/dashboard/allappliedscholarships"
                className={({ isActive }) =>
                  `mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left ${isActive ? "bg-black font-bold" : ""
                  }`
                }
              >
                All Applied Scholarships
              </NavLink>

              <NavLink
                to="/dashboard/addscholarship"
                className={({ isActive }) =>
                  `mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left ${isActive ? "bg-black font-bold" : ""
                  }`
                }
              >
                Add Scholarships
              </NavLink>

            </>
          )
        }

        {
          user && currentUserRole === 'admin' && (
            <>

              <NavLink
                to="/home"
                className="mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left"
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard/adminprofile"
                className={({ isActive }) =>
                  `mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left ${isActive ? "bg-black font-bold" : ""
                  }`
                }
              >
                Admin Profile
              </NavLink>
              <NavLink
                to="/dashboard/adminaddscholars"
                className={({ isActive }) =>
                  `mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left ${isActive ? "bg-black font-bold" : ""
                  }`
                }
              >
                Add Scholarship
              </NavLink>
              <NavLink
                to="/dashboard/adminmngscho"
                className={({ isActive }) =>
                  `mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left ${isActive ? "bg-black font-bold" : ""
                  }`
                }
              >
                Manage Scholarship
              </NavLink>

              <NavLink
                to="/dashboard/adminmngappscho"
                className={({ isActive }) =>
                  `mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left ${isActive ? "bg-black font-bold" : ""
                  }`
                }
              >
                Manage Applied Scholarship
              </NavLink>

              <NavLink
                to="/dashboard/manageusers"
                className={({ isActive }) =>
                  `mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left ${isActive ? "bg-black font-bold" : ""
                  }`
                }
              >
                Manage Users
              </NavLink>

              <NavLink
                to="/dashboard/managereviews"
                className={({ isActive }) =>
                  `mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left ${isActive ? "bg-black font-bold" : ""
                  }`
                }
              >
                Manage Reviews 
              </NavLink>


              <NavLink
                to="/dashboard/chart"
                className={({ isActive }) =>
                  `mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left ${isActive ? "bg-black font-bold" : ""
                  }`
                }
              >
                Chart
              </NavLink>


            </>
          )
        }

       


      </div>

      {/* Main Content Area */}
      <div className="w-4/5 bg-gray-100 p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Content</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
