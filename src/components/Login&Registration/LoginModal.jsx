import { IoMdLogIn } from "react-icons/io";
import { Link } from "react-router-dom";




const LoginModal = () => {
  
 



  return (
    <div className="hidden md:block pt-2">
      
        <Link to="/login">
          <div className="flex ">
            <p className="py-1 text-2xl font-semibold pr-1">
              <IoMdLogIn />
            </p>
            <p>Login</p>
          </div>
          </Link>
      

      
  
    </div>
  );
};

export default LoginModal;
