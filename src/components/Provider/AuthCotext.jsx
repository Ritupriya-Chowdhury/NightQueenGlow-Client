import { createContext, useState } from "react";
import { app } from "../../Firebase/firebase.config";
import {
    signInWithPopup,
    getAuth,
    GoogleAuthProvider
} from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); // Instantiate the provider here

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Google Sign-In
    const GoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider); // Use the instantiated provider
            setUser(result.user);
            console.log("User signed in:", result.user);
            return result;
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            throw error;
        }
    };


    

    return (
        <AuthContext.Provider value={{ user, GoogleSignIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
