import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-green-600 text-white flex flex-col items-start py-8 px-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 self-center">Dashboard</h2>
        <NavLink
          to="/home"
          className="mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left"
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard/myprofile"
          className={({ isActive }) =>
            `mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left ${
              isActive ? "bg-black font-bold" : ""
            }`
          }
        >
          My Profile
        </NavLink>
        <NavLink
          to="/dashboard/myapplication"
          className={({ isActive }) =>
            `mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left ${
              isActive ? "bg-black font-bold" : ""
            }`
          }
        >
          My Application
        </NavLink>
        <NavLink
          to="/dashboard/myreviews"
          className={({ isActive }) =>
            `mb-4 px-4 py-2 rounded-lg hover:bg-black transition-all w-full text-left ${
              isActive ? "bg-black font-bold" : ""
            }`
          }
        >
          My Reviews
        </NavLink>
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
