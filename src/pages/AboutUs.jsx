import { GiFlowerEmblem } from "react-icons/gi";
import img from "../assets/Images/istockphoto-1293334137-612x612.jpg";

const teamMembers = [
    {
        name: "Nita Queen",
        role: "CEO",
        photo:
            "https://media.istockphoto.com/id/2168733847/photo/photo-of-positive-glad-lovely-retired-lady-wear-stylish-clothes-isolated-on-dark-green-color.webp?a=1&b=1&s=612x612&w=0&k=20&c=BykhUjW8pJzB88yU54FIPya7dm47vz8ApciGR4OfHig=",
    },
    {
        name: "Jane Christ",
        role: "Makeup Artist",
        photo:
            "https://media.istockphoto.com/id/1280410981/photo/brown-eyed-woman-is-looking-tenderly-at-viewer-make-up-hairdressing-and-emotions.webp?a=1&b=1&s=612x612&w=0&k=20&c=l9OxsYuZZWBp0X8MveyDbl_kNljjOjMrEPI2OoLUa68=",
    },
    {
        name: "Sara Jhonson",
        role: "Brand Ambassador",
        photo:
            "https://media.istockphoto.com/id/1265032285/photo/portrait-of-young-girl-with-clean-skin-and-soft-makeup.webp?a=1&b=1&s=612x612&w=0&k=20&c=uqeGA0Uhq6dvbsdMtiiof0cg8KTdrMNWehCtI-P8ngU=",
    },
];

const Products = [
    {
        type: "Nail Polish",
        image:
            "https://plus.unsplash.com/premium_photo-1684952848389-2c2b58498f7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmFpbHBvbGlzaHxlbnwwfHwwfHx8MA%3D%3D",
        price:
            "50$",
    },
    {
        type: "Lipstick",
        image:
            "https://media.istockphoto.com/id/1458639401/photo/red-lipstick-close-up-on-pink-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=eem65oPoDCW2mr9WN2cQ-bR3qJu8OfDy2kn9fXrr5Es=",
        price:
            "20$",
    },
    {
        type: "Lip Gloss",
        image:
            "https://images.unsplash.com/photo-1598121496652-223b73a810fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fExpcCUyMEdsb3NzfGVufDB8fDB8fHww",
        price: "30$",
    },
];
const AboutUs = () => {
    return (
        <div className="bg-gray-100 pt-20 pb-8 ">
            <header
                className="text-center  bg-cover bg-center bg-fixed min-h-[50vh] flex flex-col justify-center"
                style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="bg-black bg-opacity-60 lg:py-36 md:py-64 py-36 px-4 min-h-[60vh]">
                    <div className="flex text-5xl font-bold  text-pink-300 inline-center justify-center">
                        <p>
                            <GiFlowerEmblem />
                        </p>
                        <h1 className="">About Night Queen Glow</h1>
                    </div>
                    <div className="mt-8 text-3xl font-semibold text-white">
                        Your trusted cosmetic shop.
                    </div>
                </div>
            </header>

            <div className="">
                <section className="pt-20 pb-12 md:px-20 px-8">
                    <h2 className={`text-3xl font-semibold `}>Our History</h2>
                    <p className="mt-8  text-2xl text-gray-700 ">
                        Founded in 2020, NightQueenGlow Beauty Shop began with the mission
                        of providing high-quality, affordable, and eco-friendly beauty
                        products. Over the years, we’ve expanded our product range and
                        service areas while staying true to our commitment to customer
                        satisfaction and promoting sustainable beauty solutions.
                    </p>
                </section>

                {/* Our Team */}
                <section className="py-12 md:px-20 px-8 ">
                    <h2 className={`text-3xl font-semibold `}>Meet Our Team</h2>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teamMembers.map((member) => (
                            <div
                                key={member.name}
                                className="bg-white shadow-md p-6 text-center rounded-lg"
                            >
                                <img
                                    className="w-[400px] h-[300px] bg-gray-200 mx-auto mb-4"
                                    src={member.photo}
                                    alt={member.name}
                                />
                                <h3 className="text-xl font-bold">{member.name}</h3>
                                <p className="text-gray-600">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Our Products */}
                <section className="py-12 md:px-20 px-8">
                    <h2 className="text-3xl font-semibold">Our Products</h2>
                    <p className="mt-4 text-2xl text-gray-700">
                        We offer a wide range of beauty products to meet every need, from
                        everyday essentials for a natural look to luxurious skin product and
                        makeup for special occasions
                    </p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Products.map((Product) => (
                            <div
                                key={Product.type}
                                className="relative shadow-lg overflow-hidden group"
                            >
                                <img
                                    src={Product.image}
                                    alt={`Image of ${Product.type}`}
                                    className="w-full h-72 object-cover"
                                />
                                <div
                                    className="absolute inset-0 pt-32
             bg-black bg-opacity-70 "
                                >
                                    <div className="p-4 text-xl text-pink-200 mt-4 mx-2">
                                        <h3 className="font-bold ">{Product.type}</h3>
                                        <p>{Product.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Values & Commitment */}
                <section className={`py-12 md:px-20 px-8 `}>
                    <h2 className="text-3xl font-semibold">Our Values & Commitment</h2>
                    <p className="mt-4 text-gray-700 text-2xl">
                        We are committed to providing exceptional customer service while prioritizing sustainability. We strive to make every beauty shopping experience seamless, enjoyable, and fulfilling.
                    </p>
                </section>

                {/* Contact Information */}

                <section className="py-4 md:px-20 px-8">
                    <h2 className="text-3xl font-semibold">Contact Us</h2>
                    <p className="mt-4 text-gray-700 text-xl font-semibold">
                        If you have any questions or need assistance, feel free to reach out
                        to us:
                    </p>
                    <div className="space-y-4 mt-8 mb-12">
                        <p className="text-xl ">
                            <strong>Phone:</strong> +880 16666-77777
                        </p>
                        <p className="text-xl ">
                            <strong>Email:</strong> nightqueen@glow.com
                        </p>
                        <p className="text-xl ">
                            <strong>Address:</strong> Boalkhali, Chattogram
                        </p>
                    </div>

                    <div>
                        <p className="text-3xl font-semibold mt-4">Our Location</p>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d70198.17174078141!2d91.87042707846486!3d22.378652066840548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad25d1b4ee63ed%3A0x57feb012672900bd!2sBoalkhali!5e0!3m2!1sen!2sbd!4v1727488235053!5m2!1sen!2sbd"
                            loading="lazy"
                            className="w-full h-72 mt-2"
                            title="Location Map"
                            aria-label="Location map"
                            style={{ border: 0 }}
                            allowFullScreen
                        ></iframe>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
