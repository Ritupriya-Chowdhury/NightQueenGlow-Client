import { Link } from 'react-router-dom';
import ProfileDetails from '../../../components/Dashboard/BuyerDashboard/ProfileDetails';
import { useContext } from 'react';
import { AuthContext } from '../../../components/Provider/AuthCotext';

const Profile = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className='bg-pink-100 min-h-screen w-screen md:ml-[90px] lg:ml-0'>
            <div className="lg:ml-[80px] md:ml-[70px] mx-4 ">
            <p className="text-pink-500 text-4xl md:text-5xl font-bold  my-8 md:ml-14 lg:ml-32">
                Your Profile!!!
            </p>
            <ProfileDetails/>
            {user.role==='buyer'?<p className="my-12 border-2 border-pink-500 bg-pink-200 hover:bg-pink-600 hover:text-white text-xl font-semibold p-4 rounded-lg w-48 text-center">
                <Link to='/buyer-dashboard/wishlist'>See wishlist</Link>
            </p>:
            user.role==='seller'?<p className="my-12 border-2 border-pink-500
             bg-pink-200 hover:bg-pink-600 hover:text-white text-xl font-semibold p-4 rounded-lg w-48 text-center">
            <Link to='/seller-dashboard/my-products'>My Products</Link>
        </p>:
        <p className="my-12 border-2 border-pink-500 bg-pink-200
         hover:bg-pink-600 hover:text-white text-xl font-semibold
          p-4 rounded-lg w-48 text-center">
            <Link to='/admin-dashboard/all-users'>All Users</Link></p>}
            </div>
        </div>
    );
};

export default Profile;