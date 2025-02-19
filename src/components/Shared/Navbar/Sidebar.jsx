import { FaBars } from "react-icons/fa";
import {
  MdOutlineContactPhone,
  MdOutlineDashboard,
  MdOutlineHome,
} from "react-icons/md";
import { PiFlower } from "react-icons/pi";
import { RiLogoutCircleLine, RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useRole } from "../../hooks/userROle";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthCotext";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdLogIn } from "react-icons/io";

const Sidebar = () => {
  const { user, cartCount, logOut } = useContext(AuthContext);
  const role = useRole();

  const handleLogOut = async () => {
    try {
      await logOut();
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const closeDrawer = () => {
    (document.getElementById("my-drawer") ).checked = false;
  };

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="drawer-button">
          <div className="border-2 hover:border-pink-400 py-[10px] px-2 rounded-lg h-[48px] hover:text-white hover:bg-pink-400">
            <FaBars />
          </div>
        </label>
      </div>
      <div className="drawer-side mt-[72px]">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-base-100 text-pink-500 min-h-screen w-80 px-4 pb-4 text-xl font-semibold space-y-2">
          <li>
            <Link to="/" onClick={closeDrawer}>
              <div className="flex">
                <p className="p-1">
                  <MdOutlineHome />
                </p>
                <p>Home</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={closeDrawer}>
              <div className="flex">
                <p className="p-1">
                  <RiProductHuntLine />
                </p>
                <p>Products</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeDrawer}>
              <div className="flex">
                <p className="p-1">
                  <PiFlower />
                </p>
                <p>About Us</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeDrawer}>
              <div className="flex">
                <p className="p-1">
                  <MdOutlineContactPhone />
                </p>
                <p>Contact</p>
              </div>
            </Link>
          </li>

          {role === "buyer" ? (
            <li>
              <Link to="/buyer-dashboard" onClick={closeDrawer}>
                <div className="flex">
                  <p className="p-1">
                    <MdOutlineDashboard />
                  </p>
                  <p>Dashboard</p>
                </div>
              </Link>
            </li>
          ) : role === "seller" ? (
            <li>
              <Link to="/seller-dashboard" onClick={closeDrawer}>
                <div className="flex">
                  <p className="p-1">
                    <MdOutlineDashboard />
                  </p>
                  <p>Dashboard</p>
                </div>
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/admin-dashboard" onClick={closeDrawer}>
                <div className="flex">
                  <p className="p-1">
                    <MdOutlineDashboard />
                  </p>
                  <p>Dashboard</p>
                </div>
              </Link>
            </li>
          )}

          {user?.role === "buyer" && (
            <li>
              <Link to="/buyer-dashboard/cart" onClick={closeDrawer}>
                <div className="flex">
                  <p>
                    <FiShoppingCart />
                  </p>
                  <p className="text-red-500 text-sm px-2">{cartCount}</p>
                </div>
              </Link>
            </li>
          )}

          {user ? (
            <li>
              <button onClick={() => { handleLogOut(); closeDrawer(); }}>
                <div className="flex">
                  <p className="py-1 pr-1">
                    <RiLogoutCircleLine />
                  </p>
                  <p>Logout</p>
                </div>
              </button>
            </li>
          ) : (
            <li>
             <Link to="/login">
          <div className="flex ">
            <p className="py-1 pr-1">
              <IoMdLogIn />
            </p>
            <p>Login</p>
          </div>
          </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
