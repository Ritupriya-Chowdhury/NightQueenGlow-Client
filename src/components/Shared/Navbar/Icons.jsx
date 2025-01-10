import { FaRegCircleUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import Sidebar from "./Sidebar";
import LoginModal from "../../Login&Registration/LoginModal";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthCotext";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { useRole } from '../../hooks/userROle'
import NavbarItems from "./NavbarItems";



const Icons = () => {
  const { user, cartCount } = useContext(AuthContext);
  const role = useRole();


  return (
    <div className="space-x-2 md:space-x-2  text-pink-500 flex  text-2xl py-1 mr-2 md:mr-8 ">
     <div className="md:hidden"> <Sidebar /></div>
     <div className="hidden md:block"><NavbarItems/></div>
      <div className="">
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
            <li className="text-lg font-semibold ">
              <LoginModal />
            </li>
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
          </ul>
        </div>
      </div>
      {user?.role === 'buyer' ? <div role="button" className=" border-2 hover:border-pink-400 px-2 py-1
       h-[50px] w-12
      rounded-lg hover:text-white hover:bg-pink-400 ">
        <Link to="/buyer-dashboard/cart">
          <div className="text-center">
            <p><FiShoppingCart /></p>
            <p className="
        text-red-500  text-sm ">{cartCount}</p>
          </div>
        </Link>
      </div> : <div></div>}

    </div>
  );
};

export default Icons;
