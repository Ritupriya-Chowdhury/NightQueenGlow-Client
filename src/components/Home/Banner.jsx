import { Link } from "react-router-dom";
import Carousel from "./Carousel";



const Banner = () => {
  
    return (
        <div
            className="hero h-[90vh] pt-16"
            style={{
                backgroundImage: "url(https://media.istockphoto.com/id/1658893205/photo/make-up-products-at-pink-background-top-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=WyC7dAydetNfqZsBhSTJebeKe9WZFEgMvjVTKFIix1M=)",
            }}>
            <div className="hero-overlay bg-opacity-80"></div>
            <div className="hero-content text-neutral-content grid md:grid-cols-2 grid-cols-1 ">
                <div className="max-w-md ">
                    <h1 className="mb-5 text-3xl font-semibold text-pink-400">New Arrivals 2024</h1>
                    <p className="mb-5  text-5xl md:text-6xl font-bold">
                       COSMETICS
                    </p>
                    <p className="border-2 border-gray-200 ml-2 px-2 py-3 w-28 text-center
             lg:mt-6 md:mt-2 mt-3 text-lg font-semibold bg-pink-400
              hover:bg-pink-500 text-black hover:text-white rounded-lg ">
                    <Link to="/products" >Shop Now</Link>
                    </p>
                </div>
                <div>
                    <Carousel />
                </div>
            </div>
        </div>
    );
};

export default Banner;
