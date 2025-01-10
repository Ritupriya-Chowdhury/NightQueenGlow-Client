import { useContext } from "react";
import { AuthContext } from "../Provider/AuthCotext";
import { IoMdLogIn } from "react-icons/io";
import Login from "./Login";
import { RiLogoutCircleLine } from "react-icons/ri";



const LoginModal = () => {
  const { user, logOut } = useContext(AuthContext); 
 

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
    <div className="">
      {user ? (
           
         <button onClick={handleLogOut} className="drawer-button">
          <div className="flex">
            <p className="py-1 text-xl pr-1">
              <RiLogoutCircleLine />
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
