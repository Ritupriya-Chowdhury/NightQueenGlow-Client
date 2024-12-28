import { createContext, useState, useEffect } from "react";
import { app } from "../../Firebase/firebase.config";
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
// import { useNavigate } from "react-router-dom";



export const AuthContext = createContext(null);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const photo = "data:image/jpeg;base64,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"

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]); // Stores cart data
    const [cartCount, setCartCount] = useState(0); // Stores count of cart items
    // const navigate = useNavigate();



    async function getUserData(email, token) {
        try {
            const response = await fetch(`https://night-queen-glow-server.vercel.app/users/email/${email}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the JWT token for authentication
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    
                    throw new Error('User not found');
                }
                else {
                    throw new Error('Failed to fetch user');
                }
            }

            const user = await response.json();

            return user;
        } catch (error) {
            console.error('Error:', error.message);
        }
    }


    const fetchAndSetUser = async (loggedUser) => {
        try {

            console.log(loggedUser)
            // Step 1: Request JWT Token
            const response = await fetch('https://night-queen-glow-server.vercel.app/jwt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loggedUser }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate JWT token');
            }

            // Step 2: Extract the token from response
            const { token } = await response.json();
            localStorage.setItem('jwt', token); // Store token in localStorage for future requests


            // Step 3: Use the token to fetch user data
            const userData = await getUserData(loggedUser, token);

            // Step 4: Set user state with the fetched user data
            setUser(userData);

            // Optional: Log for debugging
            // console.log("My User==>", userData);
        } catch (error) {
            console.error('Error in fetchAndSetUser:', error.message);
        }
    };

    // Example Usage
    // fetchAndSetUser(loggedUser, setUser);



    // Google Sign-In
    const GoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const loggedUser = result.user;




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

                    wishlist: [],
                }),
            });

            return result;
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            throw error;
        }
    };

    // Create User with Email and Password
    const createUser = async (email, password, name) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = result.user;



            // Save user to the database
            await fetch("https://night-queen-glow-server.vercel.app/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: newUser.email,
                    photoURL: newUser.photoURL || photo,
                    wishlist: [],
                }),
            });

            console.log("User created successfully:", newUser);
            return result;
        } catch (error) {
            console.error("Create User Error:", error);
            throw error;
        }
    };

    // Login with Email and Password
    const loginUser = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const loggedUser = result.user;

            console.log("User logged in successfully:", loggedUser);
            return result;
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    };

    



    // Log Out Functionality
    const logOut = async () => {
        try {

            await signOut(auth);
            localStorage.removeItem('jwt');
            setUser(null)
            // Clear user state
            console.log("User logged out successfully.");
        } catch (error) {
            console.error("Log Out Error:", error);
        }
    };


    // Monitor Auth State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

            if (currentUser) {
                console.log("email=>:", currentUser.email)
                // Generate JWT token
                const DBUser = fetchAndSetUser(currentUser.email)
                console.log("DataBase User:  ")
                //Set user data
                setUser({
                    name: DBUser.name || "Anonymous",
                    email: DBUser.email,
                    photoURL: DBUser.photoURL,
                    role: DBUser.role,
                    wishlist: DBUser.wishlist,
                });

                // const previousLocation = localStorage.getItem("previousLocation");
                // navigate(`/${previousLocation}`);
            }
            setLoading(false); // Stop loading after the user state is resolved
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    useEffect(() => {
        // Store the current location (URL) before the page refresh or navigation
        const currentLocation = window.location.pathname;
        localStorage.setItem("previousLocation", currentLocation);

        // Cleanup: Remove stored location if needed (e.g., on logout)
        return () => {
            localStorage.removeItem("previousLocation");
        };
    }, []);



    // Fetch cart data from API when the provider mounts
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const token = localStorage.getItem('jwt'); // Fetch token from localStorage
                const response = await fetch('https://night-queen-glow-server.vercel.app/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
               

                if (response.status===401) {
                    setUser(null)
                    signOut(auth);

                }
                else if(response.status === 404){
                    throw new Error('Failed to fetch cart data');
                    
                }

                const data = await response.json();
                console.log(data)
                setCartItems(data.products);
                const cont=data.products.length // Update cart items state
                setCartCount(cont); // Update cart count based on the data
            } catch (error) {
                console.error(error);
                
            }
        };

        fetchCartData();
    }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                GoogleSignIn,
                createUser,
                loginUser,
                logOut,
                loading,
                cartItems,
                cartCount
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
