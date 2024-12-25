import { useContext } from "react";
import { AuthContext } from "../Provider/AuthCotext";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import Login from "./Login";

const LoginModal = () => {
  const { user, logOut } = useContext(AuthContext); // Get `logOut` from context

  // Handle logout
  const handleLogOut = async () => {
    try {
      await logOut(); // Call the logOut method from context
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div>
      {user ? (
        <button onClick={handleLogOut}>
          <div className="flex">
            <p className="py-1 text-xl pr-1">
              <IoMdLogOut />
            </p>
            <p>Logout</p>
          </div>
        </button>
      ) : (
        <button
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <div className="flex">
            <p className="py-1 text-xl pr-1">
              <IoMdLogIn />
            </p>
            <p>Login</p>
          </div>
        </button>
      )}

      {/* Include the Login modal */}
      <Login />
    </div>
  );
};

export default LoginModal;
