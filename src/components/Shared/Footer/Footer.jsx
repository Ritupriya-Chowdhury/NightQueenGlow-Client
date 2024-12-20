import { FaFacebookF, FaInstagram, FaLinkedin, FaPhone } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import {  IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4  p-10  bg-gray-200">

        {/* Nav Links */}
        <div className=" space-y-4 ">
          <p className="text-2xl font-bold">Quick Links</p>
          <div className=" text-lg text-left font-semibold">
            <ul className="space-y-4 pl-4">
              <li>
                <div className="flex">
                  <div className="mt-1 text-pink-500">
                    <IoIosArrowForward />
                  </div>
                  <div>
                    <Link to="/" className="transition-colors duration-300 hover:ml-4
                     hover:text-pink-500">
                      Home
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex">
                  <div className="mt-1 text-pink-500">
                    <IoIosArrowForward />
                  </div>
                  <div>
                    <Link to="/products" className="transition-colors duration-300 hover:ml-4
                     hover:text-pink-500">
                      Products
                    </Link>
                  </div>
                </div>

              </li>
              <li>
                <div className="flex">
                  <div className="mt-1 text-pink-500">
                    <IoIosArrowForward />
                  </div>
                  <div>
                    <Link to="/about" className="transition-colors duration-300 hover:ml-4
                     hover:text-pink-500">
                      About Us
                    </Link>
                  </div>
                </div>

              </li>

              <li className="">
                <div className="flex">
                  <div className="mt-1 text-pink-500">
                    <IoIosArrowForward />
                  </div>
                  <div>
                    <Link to="/contact" className="transition-colors duration-300 hover:ml-4
                     hover:text-pink-500">
                      Contact
                    </Link>
                  </div>
                </div>

              </li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className=" space-y-4 ">
          <p className="text-2xl font-bold">Contact Information</p>
          <div className="text-xl space-y-4">
            <div className="flex">
              <p className="text-pink-500 p-2"><FaPhone /></p>
              <p>+880 16666-77777</p>
              </div>
            <div className="flex">
              <p className="text-pink-500 p-2"><MdEmail /></p>
              <p>shreyashri@gmail.com</p>
            </div>
            <div className="flex">
              <p className="text-pink-500 p-2"><IoLocationSharp /></p>
              <p>Boalkhali, Chattogram</p>
            </div>
          </div>
          <div className="flex space-x-2 pl-2">
            <p
              className=" transition-colors duration-200 
              border-2  mx-0 space-y-4 
               border-black p-2 rounded-full hover:bg-pink-500 hover:text-white"
            >
              <FaFacebookF />
            </p>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" transition-colors duration-200
               border-2 border-black p-2 rounded-full hover:bg-pink-500 hover:text-white"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" transition-colors duration-200 *
               border-2 border-black p-2 rounded-full hover:bg-pink-500 hover:text-white"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Subscribe */}
        <div className="">
          <p className="text-2xl font-bold mb-4">Subscribe</p>
          <p className="mt-4 text-lg font-semibold ml-1">
            Interested in receiving updates about our services? Simply subscribe
            and we will keep you informed via email.
          </p>
          <div className="mt-4">
            <input type="email" placeholder="Enter Your Email" className="px-4 py-4 border-2
             border-black" />
            <button className="border-2 border-black ml-2 px-2 py-3
             lg:mt-2 md:mt-0 mt-3 text-lg font-semibold hover:bg-pink-500 hover:text-white">Subscribe</button>
          </div>
        </div>

      </footer>
    </div>
  );
};

export default Footer;
