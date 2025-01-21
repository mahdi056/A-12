import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { toast } from 'react-toastify';
import { AuthContext } from './Authprovider/Authprovider';

const Registration = () => {


    
    const {createNewUser,setUser,updateUserProfile,signinWithgoogle} = useContext(AuthContext);
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();


    const handlegoogleSignIn = () => {
        signinWithgoogle()
        .then ((result => {
            const user = result.user;
            setUser (user);
           navigate("/home");
            
           
            
        }))
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //   console.log(errorCode,errorMessage);
          });
    }



    const handleForm = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photourl = e.target.photourl.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError(
                "Password must include at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
            );
            toast.error(passwordError, { position: "top-center" });
            return;
        } else {
            setPasswordError(""); 
        }

      
        createNewUser(email,password)
        .then ((result) => {
            const user = result.user; 
            setUser (user);

        updateUserProfile  (
            {
            displayName: name,
            photoURL: photourl
        })

           


        .then(() => {
            setUser({ ...user, displayName:name, photoURL: photourl });



            toast.success("Registration Successfull",{
                position: 'top-center',
                autoClose: 2000
            })
            setTimeout(() => navigate("/home"), 2000); 
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //   console.log(errorCode,errorMessage);
          })
          
        });

    }

     


    return (
        <div>

            <div className="mt-8">

                <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
                    <h2 className="text-2xl font-bold text-center">Register Now!!!</h2>
                    <form onSubmit={handleForm} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>

                            </label>
                            <input name="name" type="text" placeholder="Name" className="input input-bordered" required />
                        </div>



                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>

                            </label>
                            <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo-Url</span>

                            </label>
                            <input name="photourl" type="text" placeholder="Photo-Url" className="input input-bordered" required />
                        </div>
                        

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password


                                </span>
                            </label>
                            <input name="password"
                                type="password"
                                placeholder="password" className="input input-bordered" required />


                            {passwordError && (
                                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                            )}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>

                        </div>
                        <p>Already have an account? <Link className="text-blue-600 font-bold" to="/login">Login</Link> </p>

                        <button className="btn btn-outline btn-accent" onClick={handlegoogleSignIn}>SignIn With Google <FaGoogle></FaGoogle></button>
                    </form>
                </div>

            </div>

        </div>
    );
};

export default Registration;