import { Link } from "react-router-dom";

const NavbarItems = () => {
    return (
        <div className=" flex space-x-4 font-semibold text-pink-500 mt-2">
            <Link to="/">
                <div className="  py-[10px] px-1 rounded-lg text-xl hover:bg-pink-400 hover:border-pink-400 hover:text-white ">
                    <p>Home</p>
                </div>
            </Link>

            <Link to="/products">
                {" "}
                <div className="  py-[10px] px-1 rounded-lg text-xl hover:bg-pink-400 hover:border-pink-400 hover:text-white">
                    <p>Products</p>
                </div>
            </Link>

            <Link to="/about">
                {" "}
                <div className="  py-[10px] px-1 rounded-lg text-xl hover:bg-pink-400 hover:border-pink-400 hover:text-white">
                    <p>AboutUs</p>
                </div>
            </Link>

            <Link to="/contact">
                {" "}
                <div className="  py-[10px] px-1 rounded-lg text-xl hover:bg-pink-400 hover:border-pink-400 hover:text-white">
                    <p>Contact</p>
                </div>
            </Link>
        </div>
    );
};

export default NavbarItems;
