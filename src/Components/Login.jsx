import {  useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./Authprovider/Authprovider";




const Login = () => {

    const {userLogin,setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        userLogin(email,password)
        .then ((result) => {
            const user = result.user;
            setUser(user);
            toast.success("Login Successfull!",{
                position: 'top-center',
                autoClose: 2000
            })
            setTimeout(() => navigate("/home"), 2000); 
        })
        .catch((error) => {
            toast.error("Invalid email or password!", {
                position: "top-center",
                autoClose: 2000
            });
          });
    }

    

    return (
        <div>
            
            <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
                <ToastContainer></ToastContainer>
                <h2 className="text-2xl font-bold text-center">Please Login to Explore</h2>
                <form onSubmit={handlesubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>

                    </div>
                    <p>Don't have any account? <Link className="text-blue-600 font-bold" to = "/registration">Register</Link> </p>
                </form>
            </div>

        </div>
    );
};

export default Login;