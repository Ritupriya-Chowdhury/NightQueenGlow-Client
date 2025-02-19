import { Outlet } from "react-router-dom";
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar";



const AdminDashboard = () => {
    return (
        <div className="  bg-pink-100   md:bg-gray-100 pt-4 md:pt-0">
           
            <div className="md:flex">
            <div ><DashboardSidebar/></div>
            <Outlet/>
            </div>
        </div>
    );
};

export default AdminDashboard;