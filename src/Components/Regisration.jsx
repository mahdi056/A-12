import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "./Authprovider/Authprovider";
import axios from "axios";


const Registration = () => {
  const { createNewUser, setUser, updateUserProfile, signinWithgoogle } = useContext(AuthContext);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signinWithgoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate("/home");
        toast.success("Google Sign-In Successful!", {
          position: "top-center",
        });
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
        toast.error("Google Sign-In Failed. Please try again.", {
          position: "top-center",
        });
      });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photourl = e.target.photourl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must include at least one uppercase letter, a special character, and be at least 6 characters long."
      );
      toast.error("Invalid password format.", { position: "top-center" });
      return;
    }

    setPasswordError(""); 

    try {
      // Create new user
      const result = await createNewUser(email, password);
      const user = result.user;

      // Update user profile
      await updateUserProfile({
        displayName: name,
        photoURL: photourl,
      });

      setUser({ ...user, displayName: name, photoURL: photourl });

   
      const userInfo = { name, email, photo: photourl };
      const res = await axios.post("http://localhost:5000/users", userInfo);
      if (res.data.insertedId) {
        toast.success("Registration Successful!", {
          position: "top-center",
          autoClose: 2000,
        });
        e.target.reset(); 
        navigate("/home");
      }
       else if (res.data.message === "User already exists") {
        toast.error("User already exists.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Registration failed. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="mt-8">
     <ToastContainer></ToastContainer>
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
            <input name="email" type="email" placeholder="Email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input name="photourl" type="text" placeholder="Photo URL" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered"
              required
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <p>
            Already have an account?{" "}
            <Link className="text-blue-600 font-bold" to="/login">
              Login
            </Link>
          </p>
          <button type="button" className="btn btn-outline btn-accent mt-4" onClick={handleGoogleSignIn}>
            Sign In With Google <FaGoogle className="ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
