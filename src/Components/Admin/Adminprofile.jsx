import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authprovider/Authprovider";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";

const Adminprofile = () => {
  const { user } = useContext(AuthContext);
  const [currentUserRole, setCurrentUserRole] = useState('');

  useEffect(() => {
    // Fetch all users from your backend
    axios.get('https://a-12-server-side-gold.vercel.app/users')
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

  return (
    <div>

<div className="bg-gray-50 min-h-screen flex justify-center items-center py-8">
            <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">My Profile</h2>

                {/* User Profile Information */}
                <div className="flex flex-col items-center">
                    {/* User Image */}
                     {
                    user ? ( <img
                        src={user?.photourl}
                        alt="User Photo"
                        className="w-32 h-32 rounded-full border-4 border-black mb-6 shadow-lg"
                    />)
                    :
                    (<FaRegUser className="w-32 h-32 rounded-full border-4 border-black mb-6 shadow-lg"></FaRegUser>)
                   }

                    {/* User Name */}
                    <h3 className="text-2xl font-semibold text-gray-800">{user?.displayName || "Anonymous User"}</h3>

                    {/* User Email */}
                    <p className="text-lg text-gray-600">{user?.email}</p>

                    {/* User Address */}
                    <div className="mt-4 w-full">
                        <h4 className="text-lg font-medium text-gray-700">Address:</h4>
                        <p className="text-gray-600">{user?.address || "Not provided"}</p>
                    </div>

                    {/* User Phone */}
                    <div className="mt-4 w-full">
                        <h4 className="text-lg font-medium text-gray-700">Phone:</h4>
                        <p className="text-gray-600">{user?.phone || "Not provided"}</p>
                    </div>

                   
                </div>
            </div>
        </div>


    </div>
  );
};

export default Adminprofile;