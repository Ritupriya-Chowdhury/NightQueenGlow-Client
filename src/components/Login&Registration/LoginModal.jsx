import { IoMdLogIn } from "react-icons/io";
import Login from "./Login";


const LoginModal = () => {
    return (
        <div>
            <button className="" onClick={() => document.getElementById('my_modal_1').showModal()}>
            <div className="flex">
                  <p className="py-1 text-xl pr-1">
                    <IoMdLogIn />
                  </p>
                  <p>Login</p>
                </div></button>
           
               

                       
                    
                   <Login/>
                
           
        </div>
    );
};

export default LoginModal;