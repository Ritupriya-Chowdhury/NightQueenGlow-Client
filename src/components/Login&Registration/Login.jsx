import { HiOutlineXMark } from "react-icons/hi2";
import { AuthContext } from "../Provider/AuthCotext";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset previous errors

    try {
      // Fetch the user by email from the server
      const response = await fetch(
        `https://night-queen-glow-server.vercel.app/user/email/${email}`
      );

      if (!response.ok) {
        setError("User not found. Please check your email.");
        return;
      }

      const foundUser = await response.json();

      // Validate password
      if (foundUser.password !== password) {
        setError("Invalid password. Please try again.");
        return;
      }

      // Successful login
      setUser(foundUser); // Set user in context
      document.getElementById("my_modal_1")?.close(); // Close modal
      console.log("Login successful:", foundUser);
    } catch (err) {
      setError("Error during login. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box h-[700px] flex items-center justify-center bg-gray-100">
          <form method="dialog">
            <button className="btn btn-xl text-5xl btn-circle btn-ghost absolute right-2 top-2">
              <HiOutlineXMark />
            </button>
          </form>
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} // Toggle between text and password
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)} // Toggle visibility
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

            <div className="mt-4 w-full bg-pink-500 text-center text-white py-2 px-4 rounded-md hover:bg-pink-600">
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
