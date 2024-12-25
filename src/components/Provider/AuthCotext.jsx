import { createContext, useState, useEffect } from "react";
import { app } from "../../Firebase/firebase.config";
import {
    signInWithPopup,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Google Sign-In
    const GoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const loggedUser = result.user;
            console.log(loggedUser)

            // Save user to state
            setUser({
                name: loggedUser.displayName,
                email: loggedUser.email,
                photoURL: loggedUser.photoURL,
                role: "buyer", // Default role
            });

            // console.log("User signed in:", user);

            // Save user to the database
            await fetch("https://night-queen-glow-server.vercel.app/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: loggedUser.displayName,
                    email: loggedUser.email,
                    photoURL: loggedUser.photoURL,
                    role: "buyer",
                    wishlist: [], // Default role
                }),
            });

            return result;
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            throw error;
        }
    };

    // Log Out Functionality
    const logOut = async () => {
        try {
            await signOut(auth);
            setUser(null); // Clear user state
            console.log("User logged out successfully.");
        } catch (error) {
            console.error("Log Out Error:", error);
        }
    };

    // Monitor Auth State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Set user data
                console.log(currentUser)
                setUser({
                    name: currentUser.displayName,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                    role: "buyer", 
                    wishlist: [],
                });
            } else {
                setUser(null);
            }
            setLoading(false); // Stop loading after the user state is resolved
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, GoogleSignIn, logOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
