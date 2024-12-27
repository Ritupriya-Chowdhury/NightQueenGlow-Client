import { MdOutlineHome } from "react-icons/md";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthCotext";
import { RiLogoutCircleLine } from "react-icons/ri";



const SellerIcons = () => {


    const { logOut } = useContext(AuthContext);
    // Handle logout
    const handleLogOut = async () => {
        try {
            await logOut(); // Call the logOut method from context
            console.log("User logged out successfully.");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };
    return (
        <div>
            <ul className="menu bg-gray-100 text-pink-500 min-h-screen w-80 md:w-48
             lg:w-80 p-4 pt-20 text-2xl font-semibold space-y-2">

                <li>
                    <Link to='/'>
                        <div className="flex">
                            <p className="p-1 text-2xl"><MdOutlineHome /></p>
                            <p>Home</p>
                        </div>
                    </Link>
                </li>
            
                <li>
                    <button onClick={handleLogOut}>
                        <div className="flex">
                            <p className="py-1 ">
                            <RiLogoutCircleLine />
                            </p>
                            <p>Logout</p>
                        </div>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default SellerIcons;