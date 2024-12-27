import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthCotext";


const ProfileDetails = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="border-2 border-pink-500 py-8 text-xl md:text-2xl px-4 lg:px-12
          md:w-[420px] lg:w-[500px] 
         font-semibold text-gray-700">
            <img src={user.photoURL} alt="" className="mx-auto mb-8" />
            <p className="my-2">Name:{user.name} </p>
            <p >email:{user.email} </p>
            <p className="mt-2">role: {user.role} </p>
            
        </div>
    );
};

export default ProfileDetails;