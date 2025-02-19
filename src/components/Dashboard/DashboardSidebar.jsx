import { FaBars, FaRegCircleUser } from "react-icons/fa6";
import { useRole } from "../hooks/userROle";
import BuyerIcons from "./DashboardIcons/BuyerIcons";
import SellerIcons from "./DashboardIcons/SellerIcons";
import AdminIcons from "./DashboardIcons/AdminIcons";
import { Link } from "react-router-dom";

const DashboardSidebar = () => {
  const role = useRole();
  const closeDrawer = () => {
    const drawer = document.getElementById("my-drawer") ;
    if (drawer) {
      drawer.checked = false;
    }
  };
  

  return (
    <div>
      <header
        className="fixed top-0 left-0 z-10 w-full py-2
         flex justify-between items-center  bg-gray-50 shadow-md"
      >
        <div className="mx-4  flex justify-between w-full">
          <div>
          {role === "buyer" ? (
                <div >
                  <Link to="/buyer-dashboard">
                  <div className="text-pink-500 font-bold text-xl">Dashboard</div>
                  </Link>
                </div>
              ) : role === "seller" ? (
                <div>
                  <Link to="/seller-dashboard">
                  <div className="text-pink-500 font-bold text-xl">Dashboard</div>
                  </Link>
                </div>
              ) : (
                <div>
                  <Link to="/admin-dashboard">
                  <div className="text-pink-500 font-bold text-xl">Dashboard</div>
                  </Link>
                </div>
              )}
          </div>
         
          <div className="flex">
            <div className="mr-4">
              {" "}
              {role === "buyer" ? (
                <div>
                  <Link to="/buyer-dashboard/profile">
                    <div
                      className=" border-2 hover:border-pink-400 p-2 w-10 
                  rounded-lg hover:text-white hover:bg-pink-400 text-pink-400 text-xl"
                    >
                      <FaRegCircleUser />
                    </div>
                  </Link>
                </div>
              ) : role === "seller" ? (
                <div>
                  <Link to="/seller-dashboard/profile">
                    <div
                      tabIndex={0}
                      role="button"
                      className=" border-2 hover:border-pink-400 p-2 w-10 
                  rounded-lg hover:text-white hover:bg-pink-400 text-pink-400 text-xl"
                    >
                      <FaRegCircleUser />
                    </div>
                  </Link>
                </div>
              ) : (
                <div>
                  <Link to="/admin-dashboard/profile">
                    <div
                      tabIndex={0}
                      role="button"
                      className=" border-2 hover:border-pink-400 p-2 w-10 
                  rounded-lg hover:text-white hover:bg-pink-400 text-pink-400 text-xl"
                    >
                      <FaRegCircleUser />
                    </div>
                  </Link>
                </div>
              )}
            </div>
            <div className="drawer md:hidden">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div
                
              >
                <label htmlFor="my-drawer" className=" drawer-button ">
                  <div className="drawer-content border-2 hover:border-pink-400 p-2 w-10 
            rounded-lg hover:text-white hover:bg-pink-400 text-pink-400 text-xl"><FaBars /></div>
                </label>
              </div>
              <div className="drawer-side  mt-[55px] ">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <div onClick={closeDrawer}>
                  {role === "buyer" ? (
                    <BuyerIcons />
                  ) : role === "seller" ? (
                    <SellerIcons />
                  ) : (
                    <AdminIcons />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="hidden md:flex md:flex-col md:w-32 lg:w-64 min-h-screen ">
        {role === "buyer" ? (
          <BuyerIcons />
        ) : role === "seller" ? (
          <SellerIcons />
        ) : (
          <AdminIcons />
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
