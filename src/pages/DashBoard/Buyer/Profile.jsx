import { Link } from 'react-router-dom';
import ProfileDetails from '../../../components/Dashboard/BuyerDashboard/ProfileDetails';

const Profile = () => {
    return (
        <div className="lg:ml-[200px] md:ml-[120px] mx-4 ">
            <p className="text-pink-500 text-4xl md:text-5xl font-bold  my-12 text-center">
                Your Profile!!!
            </p>
            <ProfileDetails/>
            <p className="mt-8 border-2 border-pink-500 bg-pink-200 hover:bg-pink-600 hover:text-white text-xl font-semibold p-4 rounded-lg w-48 text-center">
                <Link to='/buyer-dashboard/wishlist'> See wishlist</Link>
            </p>
            </div>
    );
};

export default Profile;