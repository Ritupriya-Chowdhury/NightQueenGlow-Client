import { FaRegCircleUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import Sidebar from "./Sidebar";
import LoginModal from "../../Login&Registration/LoginModal";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthCotext";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { useRole } from '../../hooks/userROle'
import { RiLogoutCircleLine } from "react-icons/ri";




const Icons = () => {

  const { user, cartCount,logOut  } = useContext(AuthContext);
  const role = useRole();

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
    <div className="space-x-2 md:space-x-2  text-pink-500 flex  text-2xl py-1 mr-2 md:mr-8 ">
     <div className="md:hidden"> <Sidebar /></div>
    
      {user?<div className=" hidden md:block">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className=" border-2 hover:border-pink-400 p-[10px] rounded-lg hover:text-white
             hover:bg-pink-400  h-[50px] w-12"
          >
            <FaRegCircleUser />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-[1] w-40 p-2 shadow mt-2"
          >
           
            {role === 'buyer' ? <li className="">
              <Link to='/buyer-dashboard'> <div className="flex text-lg font-semibold">
                <p className="p-1"><MdOutlineDashboard /></p>
                <p>Dashboard</p>
              </div></Link>
            </li> :
              role === 'seller' ? <li>
                <Link to='/seller-dashboard'> <div className="flex text-lg font-semibold ">
                  <p className="p-1"><MdOutlineDashboard /></p>
                  <p>Dashboard</p>
                </div></Link>
              </li> : role === 'admin' ? <li>
                <Link to='/admin-dashboard'> <div className="flex text-lg font-semibold">
                  <p className="p-1"><MdOutlineDashboard /></p>
                  <p>Dashboard</p>
                </div></Link>
              </li> : <p></p>}
              <li>   <button onClick={handleLogOut} className="drawer-button">
          <div className="flex text-lg font-semibold">
            <p className="py-1  pr-1">
              <RiLogoutCircleLine />
            </p>
            <p>Logout</p>
          </div>
        </button></li>
          </ul>
        </div>
      </div>:<div></div>}
      {user?.role === 'buyer' ? <div role="button" className=" border-2 hover:border-pink-400 px-2 py-1
       h-[50px] w-12
      rounded-lg hover:text-white hover:bg-pink-400 hidden md:block">
        <Link to="/buyer-dashboard/cart">
          <div className="text-center">
            <p><FiShoppingCart /></p>
            <p className="
        text-red-500  text-sm ">{cartCount}</p>
          </div>
        </Link>
      </div> : <div className="text-lg font-semibold mt-2">
              <LoginModal />
            </div>}

    </div>
  );
};

export default Icons;
