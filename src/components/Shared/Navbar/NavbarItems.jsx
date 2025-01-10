import { Link } from "react-router-dom";

const NavbarItems = () => {
    return (
        <div className=" flex space-x-2 font-semibold">
            <Link to="/">
                <div className=" border-2 py-[10px] px-1 rounded-lg text-xl hover:bg-pink-400 hover:border-pink-400 hover:text-white ">
                    <p>Home</p>
                </div>
            </Link>

            <Link to="/products">
                {" "}
                <div className=" border-2 py-[10px] px-1 rounded-lg text-xl hover:bg-pink-400 hover:border-pink-400 hover:text-white">
                    <p>Products</p>
                </div>
            </Link>

            <Link to="/about">
                {" "}
                <div className=" border-2 py-[10px] px-1 rounded-lg text-xl hover:bg-pink-400 hover:border-pink-400 hover:text-white">
                    <p>AboutUs</p>
                </div>
            </Link>

            <Link to="/contact">
                {" "}
                <div className=" border-2 py-[10px] px-1 rounded-lg text-xl hover:bg-pink-400 hover:border-pink-400 hover:text-white">
                    <p>Contact</p>
                </div>
            </Link>
        </div>
    );
};

export default NavbarItems;
