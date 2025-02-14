import { Link } from "react-router-dom";
import Icons from "./Icons";
import Logo from "./Logo";
import NavbarItems from "./NavbarItems";

const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 z-10 w-full py-2
         flex justify-between items-center shadow-xl bg-white">
            <div className="mx-4  flex justify-between w-full">
                <div>  <Link to="/"><Logo /></Link></div>
                <div className="hidden md:block"><NavbarItems/></div>
                <div > <Icons /></div>
            </div>

        </header>
    );
};

export default Navbar;
