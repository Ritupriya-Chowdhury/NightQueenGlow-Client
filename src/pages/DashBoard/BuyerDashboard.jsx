import {  Outlet } from "react-router-dom";

import DashboardSidebar from "../../components/Dashboard/DashboardSidebar";


const BuyerDashboard = () => {
    return (
        <div className="  bg-pink-100 min-h-screen  pt-4 md:pt-0">
           
            <div className="md:flex">
            <div ><DashboardSidebar/></div>
            <Outlet/>
            </div>
        </div>
    );
};

export default BuyerDashboard;