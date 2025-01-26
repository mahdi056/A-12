import { useContext } from "react";
import { AuthContext } from "../Authprovider/Authprovider";


const Modprofile = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>

            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
                <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>

                <div className="flex flex-col items-center">
                    {/* User Image */}
                    <img
                        src={user?.photourl}
                        alt=""
                        className="w-24 h-24 rounded-full mb-4"
                    />

                    {/* User Name */}
                    <h3 className="text-xl font-semibold">{user?.displayName || "Anonymous User"}</h3>

                    {/* User Email */}
                    <p className="text-gray-600">{user?.email}</p>

                    <p className="text-red-700 text-2xl">  Moderator Role pore Add korte hobe</p>


                </div>
            </div>



        </div>
    );
};

export default Modprofile;