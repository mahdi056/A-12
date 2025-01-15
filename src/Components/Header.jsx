import { Link, NavLink } from "react-router-dom";
import logo from '../assets/s logo.png';
import { useContext } from "react";
import { AuthContext } from "./Authprovider/Authprovider";


const Header = () => {

    const {user,logout} = useContext(AuthContext);
    return (
        <div>

            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><NavLink to='/home'>Home</NavLink></li>
                            <li><NavLink to='/allscholarship'>All Scholarship</NavLink></li>
                           
                            
                        </ul>
                    </div>
                    {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
                    <img className="w-16 h-12" src={logo} alt="" />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    <li><NavLink to='/home'>Home</NavLink></li>
                    <li><NavLink to='/allscholarship'>All Scholarship</NavLink></li>
                        
                        
                    </ul>
                </div>
                <div className="navbar-end">
                {
                    user? (
                        <Link to='/home'> <button onClick={logout} className="btn btn-outline btn-info">Logout</button> </Link>
                    )
                    :
                    ( <Link to='/login'> <button className="btn btn-outline btn-info">Login</button> </Link>)

                }
                </div>
            </div>


        </div>
    );
};

export default Header;