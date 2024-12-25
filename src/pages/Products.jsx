import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/Provider/AuthCotext";

const Products = () => {
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchTerm, setSearchTerm] = useState(""); // Search input value
  const [selectedCategory, setSelectedCategory] = useState("All"); // Selected category
  const [sortOrder, setSortOrder] = useState("none"); // Sort order
  const [categories, setCategories] = useState([]); // List of categories
  const [showAll, setShowAll] = useState(false); // Show all products or limit to 8
  

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://night-queen-glow-server.vercel.app/products"
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        setProducts(data);
        setFilteredProducts(data);

        // Extract unique categories and add "All"
        const uniqueCategories = ["All", ...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Update filtered products based on selected filters
  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortOrder, products]);

  // Handle category and search term from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const name = params.get("name");
    if (category) {
      setSelectedCategory(category);
    }
    if (name) {
      setSearchTerm(name);
    }
  }, [location.search]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    navigate(`/products?category=${category}`);
  };

  // Handle clearing all filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortOrder("none");
    setShowAll(false);
    setFilteredProducts(products);
    navigate("/products");
  };

  // Determine products to display
  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 8);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-medium">Loading products...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Empty state
  if (filteredProducts.length === 0) {
    return (
      <div className="min-h-screen bg-pink-200 pt-32">
        <div className="container mx-auto p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">No products found</h1>
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>
    );
  }

  // Main component rendering
  return (
    <div className="min-h-screen bg-pink-200 pt-32">
      <div className="container mx-auto p-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name..."
            className="p-2 border rounded w-full md:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Category */}
          <select
            className="p-2 border rounded w-full md:w-1/4"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            className="p-2 border rounded w-full md:w-1/4"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>

          {/* Clear Filters */}
          <button
            className="bg-pink-500 text-white px-3 py-2 rounded hover:bg-pink-600"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-600 truncate">{product.category}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-pink-500">${product.price}</span>
                  <div className="flex gap-2">
                    <Link to={`/products/${product._id}`}
                      className="bg-pink-400 text-white px-3 py-1 rounded shadow hover:bg-pink-500"
                      
                    >
                      View Details
                    </Link>
                    <button
                      className={`${
                        user ? "bg-pink-500 hover:bg-pink-600" : "bg-gray-400 cursor-not-allowed"
                      } text-white px-3 py-1 rounded shadow`}
                      onClick={() => navigate(`/cart`)} // Navigate to cart page (if exists)
                      disabled={!user} // Disable the button if user is not logged in
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        {!showAll && filteredProducts.length > 8 && (
          <div className="flex justify-center mt-12 py-12">
            <button
              className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
              onClick={() => setShowAll(true)}
            >
              View All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
