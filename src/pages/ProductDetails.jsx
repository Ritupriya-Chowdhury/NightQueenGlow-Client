import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id} = useParams(); // Assuming productId is passed in the URL
  const navigate = useNavigate();

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://night-queen-glow-server.vercel.app/products/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Handle Add to Cart
  const handleAddToCart = () => {
    // Logic for adding the product to the cart (e.g., updating Redux state or localStorage)
    console.log(`Added ${product.name} to cart`);
    navigate("/cart"); // Navigate to cart page (if it exists)
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-medium">Loading product details...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 ">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Render product details
  return (
    <div className="min-h-screen bg-pink-200 py-16 pt-32">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Product Information */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-gray-700 mb-4">
              {product.category}
            </p>
            <p className="text-lg  text-gray-700 mb-4">
              {product.description}
            </p>
           
            
            

            
            <div className="text-xl font-bold text-pink-500 mb-4">
              ${product.price}
            </div>
            <p className="text-2xl font-semibold text-gray-800 mb-4">
              Seller Name: {product.sellerName}
            </p>

            {/* Add to Cart & Shop Now Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
              >
                Add to Cart
              </button>
              
            </div>
          </div>
        </div>

        {/* Back to Products Button */}
        <div className="mt-8 text-center">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            onClick={() => navigate("/products")}
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
