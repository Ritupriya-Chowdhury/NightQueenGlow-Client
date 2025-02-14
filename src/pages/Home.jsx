import Banner from "../components/Home/Banner";
import Category from "../components/Home/Category/Category";
import ContactSection from "../components/Home/ContactSection";
import FAQSection from "../components/Home/FAQSection";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import Offer from "../components/Home/Offer";
import Testimonial from "../components/Home/Testomonial";

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedProducts/>
            <Category/>
            <Offer/>
            <Testimonial/>
            <FAQSection/>
            <ContactSection/>
        </div>
    );
};

export default Home;