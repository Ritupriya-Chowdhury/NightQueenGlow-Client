import { FaBars } from "react-icons/fa6";
import { useRole } from "../hooks/userROle";
import BuyerIcons from "./DashboardIcons/BuyerIcons";
import SellerIcons from "./DashboardIcons/SellerIcons";
import AdminIcons from "./DashboardIcons/AdminIcons";

const DashboardSidebar = () => {
    
    const role = useRole();
   
    return (
       <div>
         <div className="drawer md:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content
            border-2 hover:border-pink-400 p-2 w-10 ml-8 rounded-lg hover:text-white hover:bg-pink-400">

                <label htmlFor="my-drawer" className=" drawer-button "><FaBars /> </label>
            </div>
            <div className="drawer-side  mt-[74px] ">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
               {role==='buyer'?
               <BuyerIcons/>:
               role==="seller"?
               <SellerIcons/>:
               <AdminIcons/>

               }
            </div>
        </div>
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