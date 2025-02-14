import { Link } from "react-router-dom";
import img from "../../assets/Images/istockphoto-1164892827-612x612-removebg-preview.png";


const Offer = () => {
    return (
        <section className="relative w-full bg-pink-200  pt-16 ">
            <div className="container mx-auto grid md:grid-cols-2 items-center gap-2 ">
                {/* Left: Offer Text */}
                <div className="text-center md:text-left">
                    <h2 className="text-4xl font-bold text-pink-600">
                        Exclusive Beauty Deals
                    </h2>
                    <p className="mt-4 text-lg text-gray-700">
                        Get up to <span className="text-pink-500 font-semibold">50% OFF</span> your first order.
                        Limited-time offer—don&apos;t miss out!
                    </p>
                    <Link
                        to="/signup"
                        className="mt-6 inline-block bg-white border-2 border-pink-500 text-pink-500 hover:text-white font-bold px-6 py-3 rounded-lg text-lg hover:bg-pink-500 transition duration-300"
                    >
                        Sign Up Now
                    </Link>
                </div>

                {/* Right: Offer Image with Background */}
                <div className="">
                   
                    <img
                        src={img}
                        alt="Beauty Offer"
                        className="relative w-[90%] md:w-full "
                    />
                </div>
            </div>
        </section>
    );
};

export default Offer;
