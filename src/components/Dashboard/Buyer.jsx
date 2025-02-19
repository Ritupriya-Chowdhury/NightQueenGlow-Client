import Carts from "../../pages/DashBoard/Buyer/Carts";
import WishListComponent from "./BuyerDashboard/WishListComponent";



const Buyer = () => {
  
  return (
    <div className=" md:ml-[90px] lg:ml-0 bg-pink-100 min-h-screen w-screen overflow-x-auto">
   <WishListComponent/>
     <Carts/>
    </div>
  );
};

export default Buyer;
