
import { FaRegCircleUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";



const Icons = () => {
    return (
        <div className="space-x-2 md:space-x-6  text-pink-500 flex  text-2xl py-1 mr-2 md:mr-8 ">
            <Sidebar />
            <div className="drawer-button">
                <FiShoppingCart />

            </div>
            <div className="">

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="" ><FaRegCircleUser /></div>
                    <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-[1] w-32 p-2 shadow mt-2">
                        <li className="text-lg font-semibold">
                            <Link to="/login">
                                <div className="flex">
                                    <p className="py-1 text-xl pr-1"><IoMdLogIn /></p>
                                    <p>Login</p>
                                </div>
                            </Link>
                        </li>

                    </ul>
                </div></div>

        </div>
    );
};

export default Icons;