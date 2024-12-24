import { HiOutlineXMark } from "react-icons/hi2";
import { AuthContext } from "../Provider/AuthCotext"; 
import { useContext } from "react";

const Login = () => {
  const { GoogleSignIn } = useContext(AuthContext);

  // Sign in with Google
  const handleGoogleSignIn = () => {
    GoogleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        console.log("Logged User:", loggedUser);

        // Example: Save user data to the database
        fetch("https://night-queen-glow-server.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: loggedUser.displayName,
            email: loggedUser.email,
            role: "buyer", // Default role
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("User saved to database:", data);
          });
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
      });
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

            {/* Login Form */}
            <form className="space-y-4">
              {/* Email Field */}
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
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                Login
              </button>
            </form>

            {/* Google Login */}
            <button
              className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
