import { FaBars } from "react-icons/fa";
import { MdOutlineContactPhone, MdOutlineHome } from "react-icons/md";
import { PiFlower } from "react-icons/pi";
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";




const Sidebar = () => {
   
  
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content 
            ">

                <label htmlFor="my-drawer" className=" drawer-button ">
                    <div className="border-2 hover:border-pink-400 py-[10px] px-2 rounded-lg 
                h-[48px] 
                hover:text-white hover:bg-pink-400 " >
                <FaBars /></div> </label>
            </div>
            <div className="drawer-side  mt-[80px] ">
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
                  
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;