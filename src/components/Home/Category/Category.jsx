import { useNavigate } from "react-router-dom";

const categories = [
    {
      id: 1,
      Category: "Skincare",
      image: "https://media.istockphoto.com/id/1136422297/photo/face-cream-serum-lotion-moisturizer-and-sea-salt-among-bamboo-leaves.webp?a=1&b=1&s=612x612&w=0&k=20&c=_3cAMohE8QB7d0sm1mAq2VEnE9UWsw6f5qT0yrJBTlw=", 
      names: ["Moisturizer", "Face Cleanser", "Sunscreen", "Serum"],
    },
    {
      id: 2,
      Category: "Makeup",
      image: "https://plus.unsplash.com/premium_photo-1677526496597-aa0f49053ce2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWFrZXVwJTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D", 
      names: ["Foundation", "Lipstick", "Mascara", "Blush", "Eye Shadow"],
    },
    {
      id: 3,
      Category: "Haircare",
      image: "https://images.unsplash.com/photo-1624939461078-66a124b3539c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhhaXJjYXJlJTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D", 
      names: ["Shampoo", "Conditioner", "Hair Oil", "Heat Protectant"],
    },
    {
      id: 4,
      Category: "Fragrances",
      image: "https://plus.unsplash.com/premium_photo-1726873234228-a511f8a05f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RnJhZ3JhbmNlcyUyMHByb2R1Y3RzfGVufDB8fDB8fHww", 
      names: ["Perfume", "Body Mist", "Cologne", "Essential Oil"],
    },
    {
      id: 5,
      Category: "Body Care",
      image: "https://media.istockphoto.com/id/1306102673/photo/set-of-female-skin-care-products.webp?a=1&b=1&s=612x612&w=0&k=20&c=ClKq6jsERtXUTO9no7qeMOvLrfYmRFry2HGSfjLUonI=", 
      names: ["Body Lotion", "Body Scrub", "Shower Gel", "Hand Cream"],
    },
    {
      id: 6,
      Category: "Nail Care",
      image: "https://images.unsplash.com/photo-1602585578130-c9076e09330d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmFpbHMlMjBwb2xpc2h8ZW58MHx8MHx8fDA%3D", 
      names: ["Nail Polish", "Cuticle Oil", "Nail Strengthener", "Nail File"],
    },
  ];

  const Category = () => {
    const navigate = useNavigate();
  
    const handleCategoryClick = (category) => {
      navigate(`/products?category=${encodeURIComponent(category)}`);
    };
  
    const handleNameClick = (name) => {
      navigate(`/products?name=${encodeURIComponent(name)}`);
    };
  
    return (
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-8 py-12 bg-white">
          {categories.map((category) => (
            <div
              key={category.id}
              className="mx-2 md:mx-8 my-8 cursor-pointer  flex bg-pink-100 p-4 rounded-lg"
              onClick={() => handleCategoryClick(category.Category)}
            >
              <div>
                <img
                  src={category.image}
                  alt={category.Category}
                  className="w-[100px] h-[100px] object-cover mx-auto"
                />
                <p className="text-xl font-bold text-center mt-4 text-black">
                  {category.Category}
                </p>
              </div>
              <div className="text-gray-700 mx-8">
                {category.names.map((name, index) => (
                  <p
                    key={index}
                    className="text-lg font-medium cursor-pointer "
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNameClick(name);
                    }}
                  >
                    {name}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Category;
  