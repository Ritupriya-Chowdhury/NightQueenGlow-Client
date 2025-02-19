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
    FacebookAuthProvider
} from "firebase/auth";
// import { useNavigate } from "react-router-dom";



export const AuthContext = createContext(null);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const photo = ""

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
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
            const userEmail = loggedUser.email;

            // Send the user's email to generate a JWT
            const response = await fetch('https://night-queen-glow-server.vercel.app/jwt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail }),
            });


            if (!response.ok) {
                throw new Error('Failed to generate JWT token');
            }



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
            const { token } = await response.json();
            localStorage.setItem('jwt', token); // Store token for future requests

            const userData = await getUserData(loggedUser.email, token);
            setUser(userData)

            return result;
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            throw error;
        }
    };
    // Facebook Sign-In
    const FacebookSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            console.log(result)
            const loggedUser = result.user;
            const userEmail = loggedUser.email;

            // Send the user's email to generate a JWT
            const response = await fetch('https://night-queen-glow-server.vercel.app/jwt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail }),
            });


            if (!response.ok) {
                throw new Error('Failed to generate JWT token');
            }



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
            const { token } = await response.json();
            localStorage.setItem('jwt', token); // Store token for future requests

            const userData = await getUserData(loggedUser.email, token);
            setUser(userData)

            return result;
        } catch (error) {
            console.error("Facebook Sign-In Error:", error);
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

            const loggedUser = result.user;
            const userEmail = loggedUser.email;

            // Send the user's email to generate a JWT
            const response = await fetch('https://night-queen-glow-server.vercel.app/jwt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail }),
            });


            if (!response.ok) {
                throw new Error('Failed to generate JWT token');
            }



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
            const { token } = await response.json();
            localStorage.setItem('jwt', token); // Store token for future requests

            const userData = await getUserData(loggedUser.email, token);
            setUser(userData)


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
            const userEmail = loggedUser.email;

            // Send the user's email to generate a JWT
            const response = await fetch('https://night-queen-glow-server.vercel.app/jwt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail }),
            });


            if (!response.ok) {
                throw new Error('Failed to generate JWT token');
            }
            const { token } = await response.json();
            localStorage.setItem('jwt', token); // Store token for future requests

            const userData = await getUserData(loggedUser.email, token);
            setUser(userData)
            console.log("My User==>", user)

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
            setCartCount(0)
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
        const currentLocation = window.location.pathname;
        localStorage.setItem("previousLocation", currentLocation);
    
        return () => {
            localStorage.removeItem("previousLocation"); // Cleanup if needed (e.g., on logout)
        };
    }, []);



    const fetchCartData = async () => {
        try {
          const token = localStorage.getItem("jwt");
          const response = await fetch("https://night-queen-glow-server.vercel.app/cart", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (response.status === 401) {
            setUser(null);
            signOut(auth);
            return;
          } else if (response.status === 404) {
            throw new Error("Failed to fetch cart data");
          }
      
          const cartData = await response.json();
          
          // Count total number of products in the cart
          const totalItems = cartData.products ? cartData.products.reduce((sum, item) => sum + item.quantity, 0) : 0;
          
          setCartCount(totalItems);
        } catch (error) {
          console.error(error);
        }
      };
      
      useEffect(() => {
        fetchCartData();
      }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                GoogleSignIn,
                FacebookSignIn,
                createUser,
                loginUser,
                logOut,
                loading,
                cartCount
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
