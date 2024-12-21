import Banner from "../components/Home/Banner";
import ContactSection from "../components/Home/ContactSection";
import FAQSection from "../components/Home/FAQSection";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import Testimonial from "../components/Home/Testomonial";

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedProducts/>
            <Testimonial/>
            <FAQSection/>
            <ContactSection/>
        </div>
    );
};

export default Home;