import { FaRegCircleUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import Sidebar from "./Sidebar";
import LoginModal from "../../Login&Registration/LoginModal";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthCotext";
import { Link } from "react-router-dom";




const Icons = () => {
  const { user, cartCount } = useContext(AuthContext);

  return (
    <div className="space-x-2 md:space-x-6  text-pink-500 flex  text-2xl py-1 mr-2 md:mr-8 ">
      <Sidebar />
      <div className="">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className=" border-2 hover:border-pink-400 p-2 rounded-lg hover:text-white hover:bg-pink-400"
          >
            <FaRegCircleUser />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-[1] w-32 p-2 shadow mt-2"
          >
            <li className="text-lg font-semibold">
              <LoginModal />
            </li>
          </ul>
        </div>
      </div>
      {user?.role==='buyer' ? <div className=" border-2 hover:border-pink-400 p-2 rounded-lg hover:text-white hover:bg-pink-400">
        <Link to="/buyer-dashboard/cart">
          <div className="">
            <p><FiShoppingCart /></p>
            <p className="
        text-red-500 ml-1 text-sm">{cartCount}</p>
          </div>
        </Link>
      </div> : <div></div>}
      
    </div>
  );
};

export default Icons;
