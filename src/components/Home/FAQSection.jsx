import { useState } from "react";

const faqData = [
  {
    question: "What skincare products do you offer?",
    answer:
      "We offer a wide range of skincare products, including moisturizers, cleansers, serums, and face masks tailored to all skin types.",
  },
  {
    question: "Are your products cruelty-free?",
    answer:
      "Yes, all our products are cruelty-free, and many are also vegan and made with sustainably sourced ingredients.",
  },
  {
    question: "Do you provide personalized product recommendations?",
    answer:
      "Absolutely! You can take our online quiz or contact our experts to get recommendations based on your unique skin needs and preferences.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of purchase for unopened products. For more details, visit our Returns & Refunds page.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking link via email to monitor your package in real-time.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mx-auto px-4 pb-16 bg-white">
      <h2 className="text-4xl py-16 font-bold text-center  ">
        Frequently Asked Questions
      </h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {faqData.map((item, index) => (
          <div key={index} className="border-b border-gray-500 pb-4">
            <button
              className="w-full flex text-xl font-medium  focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-3xl">
                {activeIndex === index ? "-" : "+"}
              </span>
              <span className="ml-3 text-left">{item.question}</span>
            </button>
            <div
              className={`mt-2  transition-all duration-300 text-lg ${
                activeIndex === index ? "max-h-screen" : "max-h-0 overflow-hidden"
              }`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
