import { MdOutlineHome } from "react-icons/md";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthCotext";
import { FaRegCircleUser, FaRegHeart } from "react-icons/fa6";
import { RiLogoutCircleLine, RiProductHuntLine } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";



const BuyerIcons = () => {


    const { logOut, cartCount} = useContext(AuthContext);

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
             lg:w-64 p-4 pt-20 text-2xl font-semibold space-y-2">

                <li>
                    <Link to='/'>
                        <div className="flex">
                            <p className="p-1 text-2xl"><MdOutlineHome /></p>
                            <p>Home</p>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to='/products'>
                        <div className="flex">
                            <p className="p-1 text-2xl"><RiProductHuntLine /></p>
                            <p>Products</p>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to='/buyer-dashboard'>
                        <div className="flex">
                            <p className="p-1 text-2xl"> <FaRegCircleUser /></p>
                            <p>Profile</p>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to='/buyer-dashboard/wishlist'> <div className="flex">
                        <p className="p-1"><FaRegHeart /></p>
                        <p>Wishlist</p>
                    </div></Link>
                </li>
                <li>
                    <Link to='/buyer-dashboard/cart'>
                    <p className="  pl-6 ">
                        <FiShoppingCart />
                    </p>
                    <p className="text-red-600 ml-1">{cartCount}</p></Link>
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

export default BuyerIcons;