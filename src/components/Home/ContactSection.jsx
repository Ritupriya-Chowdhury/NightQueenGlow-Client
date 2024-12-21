const ContactSection = () => {
  return (
    <div className="mx-auto px-4 py-16 bg-pink-50">
      <h2 className="text-4xl font-bold text-center mb-8 ">
        Night Queen Glow
      </h2>
      <p className="text-center  mb-8 text-xl">
        We&apos;d love to hear from you! Whether you have a question, feedback, or need assistance, reach out to us anytime.
      </p>
     
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Contact Form */}
        <form className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <div>
            <label htmlFor="name" className="block  text-xl font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full border border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label htmlFor="email" className="block  text-xl font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full border border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label htmlFor="message" className="block  text-xl font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Write your message here..."
              rows={5}
              className="w-full border border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full border-2 border-black  hover:text-white font-semibold text-xl py-3
               rounded-lg hover:bg-pink-500 transition duration-300"
          >
            Send Message
          </button>
        </form>


      </div>
    </div>
  );
};

export default ContactSection;
