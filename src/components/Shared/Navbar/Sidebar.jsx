import { FaBars } from "react-icons/fa";
import { MdOutlineContactPhone, MdOutlineDashboard, MdOutlineHome } from "react-icons/md";
import { PiFlower } from "react-icons/pi";
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useRole } from "../../hooks/userROle";



const Sidebar = () => {
    const role = useRole();
  
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content 
            ">

                <label htmlFor="my-drawer" className=" drawer-button ">
                    <div className="border-2 hover:border-pink-400 p-2 rounded-lg hover:text-white hover:bg-pink-400" >
                <FaBars /></div> </label>
            </div>
            <div className="drawer-side  mt-[74px] ">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-100 text-pink-500 min-h-screen w-80 p-4 text-xl font-semibold space-y-2">

                    <li>
                        <Link to='/'>
                            <div className="flex">
                                <p className="p-1"><MdOutlineHome /></p>
                                <p>Home</p>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to='/products'> <div className="flex">
                            <p className="p-1"><RiProductHuntLine /></p>
                            <p>Products</p>
                        </div></Link>
                    </li>
                    <li>
                        <Link to='/about'> <div className="flex">
                            <p className="p-1"><PiFlower /></p>
                            <p>AboutUs</p>
                        </div></Link>
                    </li>
                    <li>
                        <Link to='/contact'> <div className="flex">
                            <p className="p-1"><MdOutlineContactPhone /></p>
                            <p>Contact</p>
                        </div></Link>
                    </li>
                    {role==='buyer'?<li>
                        <Link to='/buyer-dashboard'> <div className="flex">
                            <p className="p-1"><MdOutlineDashboard /></p>
                            <p>Dashboard</p>
                        </div></Link>
                    </li>:
                    role==='seller'?<li>
                        <Link to='/seller-dashboard'> <div className="flex">
                            <p className="p-1"><MdOutlineDashboard /></p>
                            <p>Dashboard</p>
                        </div></Link>
                    </li>:role==='admin'?<li>
                        <Link to='/admin-dashboard'> <div className="flex">
                            <p className="p-1"><MdOutlineDashboard /></p>
                            <p>Dashboard</p>
                        </div></Link>
                    </li>:<p></p>}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;