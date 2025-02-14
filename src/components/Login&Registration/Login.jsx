import { AuthContext } from "../Provider/AuthCotext";
import { useState, useContext } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const { GoogleSignIn, loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Predefined credentials for different roles
  const demoUsers = {
    admin: { email: "ritupriyabgc@gmail.com", password: "Kala_vuna_1@" },
    seller: { email: "developerpriya96@gmail.com", password: "Kala_vuna_2@" },
    buyer: { email: "shreyashree@gmail.com", password: "Kala_vuna_3@" },
  };

  // Autofill credentials based on selected role
  const handleDemoLogin = (role) => {
    setEmail(demoUsers[role].email);
    setPassword(demoUsers[role].password);
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await GoogleSignIn();
      console.log(result);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError("Google Sign-In failed. Please try again.");
    }
  };

  // Handle form-based login using AuthContext's loginUser function
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await loginUser(email, password);
      const loggedUser = result.user;

      // Generate JWT token
      const response = await fetch(
        "https://night-queen-glow-server.vercel.app/jwt",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: loggedUser.email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate JWT token");
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <p className="text-blue-600 mb-4 underline font-bold">Demo Login</p>

        {/* Demo login buttons */}
        <div className="flex space-x-2 text-sm mb-4">
          <button
            className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
            onClick={() => handleDemoLogin("admin")}
          >
            Admin
          </button>
          <button
            className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
            onClick={() => handleDemoLogin("seller")}
          >
            Seller
          </button>
          <button
            className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
            onClick={() => handleDemoLogin("buyer")}
          >
            Buyer
          </button>
        </div>

        <form className="space-y-4 mt-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border-2 border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border-2 border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-0 text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Display error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

        {/* Google and Facebook login */}
        <div className="flex justify-center space-x-4">
          <button
            className="mt-4 border border-black p-2 hover:p-3 rounded-md"
            onClick={handleGoogleSignIn}
          >
            <FaFacebookF />
          </button>
          <button
            className="mt-4 border border-black p-2 hover:p-3 rounded-md"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle />
          </button>
        </div>

        {/* Sign up link */}
        <div className="mt-4 w-full bg-pink-500 text-center text-white py-2 px-4 rounded-md hover:bg-pink-600">
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
