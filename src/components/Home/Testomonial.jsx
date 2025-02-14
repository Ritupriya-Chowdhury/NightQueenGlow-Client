import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const testimonials = [
  {
    image:
      "https://plus.unsplash.com/premium_photo-1681821712294-522293b833d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amVzc2ljYSUyMGElMjBjYXIlMjByZXZpZXdlcnxlbnwwfHwwfHx8MA%3D%3D",
    name: "Jessica",
    review:
      "NightQueenGlow's products transformed my skin! The quality and effectiveness are unmatched.",
    rating: 5,
  },
  {
    image:
      "https://media.istockphoto.com/id/525725926/photo/young-adult-modern-dressed-sitting-in-moder-car.webp?a=1&b=1&s=612x612&w=0&k=20&c=zHR3iuIn1zJi-t8S0gRp0uelCK-ed6WCm-TE3UKnj1Y=",
    name: "John Doe",
    review:
      "The best skincare experience I've ever had. My skin feels healthier and rejuvenated.",
    rating: 4.5,
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1661405462154-ce23978ccf0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
    name: "Jane Smith",
    review:
      "Their customer service is incredible, and I love the natural ingredients in their products.",
    rating: 4,
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1726826675050-0b9aaba377fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM2fHx8ZW58MHx8fHx8",
    name: "Sarah Johnson",
    review:
      "NightQueenGlow has the best products for sensitive skin. No irritation, just glowing results!",
    rating: 5,
  },
];

const Testimonial = () => {
  return (
    <div className="pb-16 bg-pink-50">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800  py-16">
          Customer Testimonials
        </h2>
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="mb-12 h-[400px]">
                <div className="bg-white p-6 shadow-lg rounded-lg h-96">
                  <div className="flex justify-center">
                    <img
                      src={testimonial.image}
                      className="w-40 h-40 shadow-lg rounded-full"
                      alt={testimonial.name}
                    />
                  </div>
                  <div className="mt-4 text-left">
                    <h3 className="text-xl font-bold text-gray-900 mt-8">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-700 font-medium mt-2 text-lg">
                      {testimonial.review}
                    </p>
                    <div className="mt-4 text-yellow-500">
                      {"⭐".repeat(Math.floor(testimonial.rating))}
                      {"☆".repeat(5 - Math.floor(testimonial.rating))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
