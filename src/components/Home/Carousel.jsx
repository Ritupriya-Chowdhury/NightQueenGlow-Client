import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const Carousel = () => {
  const slides = [
    "https://media.istockphoto.com/id/924985612/photo/make-up-artist-is-working-with-face-of-gorgeous-model-cosmetic-manicure-and-make-up.webp?a=1&b=1&s=612x612&w=0&k=20&c=T_5x_catrstY2Y1RctLR5y0Aiq8dTk41cnPRNFBM_7c=",
    "https://media.istockphoto.com/id/495440338/photo/lilac-french-manicure.webp?a=1&b=1&s=612x612&w=0&k=20&c=dobt8E_VE_yFzQHJLRAtmq5_zUci5PJUHz12tEJ0X9M=",
    "https://media.istockphoto.com/id/460823121/photo/beauty-closeup.webp?a=1&b=1&s=612x612&w=0&k=20&c=R_nHPR5VD1xlrheZ2p2Rd4z2Vj8qi-dU8YqIyeBo5aA=",
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-[500px] md:w-[700px] h-[250px] md:h-[400px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
