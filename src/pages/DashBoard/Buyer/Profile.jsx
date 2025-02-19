import ProfileDetails from '../../../components/Dashboard/BuyerDashboard/ProfileDetails';

const Profile = () => {
 
    return (
        <div className='bg-pink-100 min-h-screen w-screen md:ml-[90px] lg:ml-0 pt-16'>
            <div className="lg:ml-[80px] md:ml-[70px] mx-4 ">
            <p className="text-pink-500 text-4xl md:text-5xl font-bold  my-8 md:ml-14 lg:ml-32">
                Your Profile!!!
            </p>
            <ProfileDetails/>
           
            </div>
        </div>
    );
};

export default Profile;