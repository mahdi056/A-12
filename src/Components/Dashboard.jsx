import { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from './Authprovider/Authprovider';
import axios from 'axios';
import {
  FaUser, FaChartBar, FaHome, FaFileAlt, FaPlus, FaUsers,
  FaStar, FaThList, FaBars, FaTimes
} from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [currentUserRole, setCurrentUserRole] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
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

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 py-2 px-4 rounded-md transition-all w-full text-sm md:text-base text-left hover:bg-green-700 ${
      isActive ? 'bg-green-700 font-semibold' : ''
    }`;

  const renderLinks = () => {
    if (!user) return null;

    const commonLinks = [
      { to: "/home", label: "Home", icon: <FaHome /> }
    ];

    const roleBasedLinks = {
      user: [
        { to: "/dashboard/myprofile", label: "My Profile", icon: <FaUser /> },
        { to: "/dashboard/userchart", label: "Stats", icon: <FaChartBar /> },
        { to: "/dashboard/myapplication", label: "My Application", icon: <FaFileAlt /> },
        { to: "/dashboard/myreviews", label: "My Reviews", icon: <FaStar /> }
      ],
      moderator: [
        { to: "/dashboard/modprofile", label: "My Profile", icon: <FaUser /> },
        { to: "/dashboard/managescholarships", label: "Manage Scholarships", icon: <FaThList /> },
        { to: "/dashboard/allreviews", label: "All Reviews", icon: <FaStar /> },
        { to: "/dashboard/allappliedscholarships", label: "All Applied Scholarships", icon: <FaFileAlt /> },
        { to: "/dashboard/addscholarship", label: "Add Scholarships", icon: <FaPlus /> }
      ],
      admin: [
        { to: "/dashboard/adminprofile", label: "Admin Profile", icon: <FaUser /> },
        { to: "/dashboard/adminaddscholars", label: "Add Scholarship", icon: <FaPlus /> },
        { to: "/dashboard/adminmngscho", label: "Manage Scholarship", icon: <FaThList /> },
        { to: "/dashboard/adminmngappscho", label: "Manage Applied Scholarship", icon: <FaFileAlt /> },
        { to: "/dashboard/manageusers", label: "Manage Users", icon: <FaUsers /> },
        { to: "/dashboard/managereviews", label: "Manage Reviews", icon: <FaStar /> },
        { to: "/dashboard/chart", label: "Chart", icon: <FaChartBar /> }
      ]
    };

    return [
      ...(roleBasedLinks[currentUserRole] || []),
      ...commonLinks
    ].map(({ to, label, icon }) => (
      <NavLink
        key={to}
        to={to}
        onClick={() => setSidebarOpen(false)}
        className={linkClass}
      >
        {icon} {label}
      </NavLink>
    ));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Mobile Toggle */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 text-3xl text-green-700"
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full bg-green-600 text-white w-3/5 sm:w-1/3 md:w-1/5 z-40 transition-all duration-300 px-4 py-6 space-y-4 shadow-lg ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
        <nav className="flex flex-col space-y-2">{renderLinks()}</nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <h1 className="text-center text-2xl md:text-4xl font-bold mt-4">
          Welcome {user?.displayName}
        </h1>
        <div className="bg-white rounded-lg shadow-md mt-6 p-6 min-h-[400px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
