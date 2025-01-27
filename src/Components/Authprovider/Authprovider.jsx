import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../../../firebase.init";
import axios from "axios"; // Import Axios for API calls

export const AuthContext = createContext();
const auth = getAuth(app);

const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const createNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };

    const logout = () => {
        localStorage.removeItem("authToken"); 
        return signOut(auth);
    };

    const signinWithgoogle = () => {
        return signInWithPopup(auth, provider);
    };

    const userLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const authInfo = {
        user,
        setUser,
        createNewUser,
        updateUserProfile,
        logout,
        signinWithgoogle,
        userLogin,
        loading,
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userData = {
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    photourl: currentUser.photoURL,
                };
                setUser(userData);
    
                try {
                   
                    const response = await axios.post("http://localhost:5000/jwt", { email: currentUser.email });
                    const token = response.data.token;
    
                    if (token) {
                        localStorage.setItem("authToken", token); 
                    }
                } catch (error) {
                    console.error("Failed to fetch JWT token:", error);
                }
            } else {
              
                setUser(null);
                localStorage.removeItem("authToken");
            }
    
            
            setLoading(false);
        });
    
        
        return () => unsubscribe();
    }, []);
    

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default Authprovider;
