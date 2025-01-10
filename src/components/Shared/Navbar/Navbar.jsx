import Icons from "./Icons";
import Logo from "./Logo";

const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 z-10 w-full py-1 
         flex justify-between items-center shadow-xl bg-white">
            <div className="mx-4  flex justify-between w-full">
                <div>  <Logo /></div>
                <div > <Icons /></div>
            </div>

        </header>
    );
};

export default Navbar;
