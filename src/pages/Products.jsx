import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false); // For toggling the "View All" feature

  const location = useLocation();
  const history = useNavigate();

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://night-queen-glow-server.vercel.app/products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);

        // Extract unique categories for the category filter
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

  // Filter products based on search term, category, rating, and sorting
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Search by name
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by price
    if (sortOrder === "asc") {
      filtered = filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOrder === "desc") {
      filtered = filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortOrder, products]);

  // Update category from URL if necessary
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [location.search]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    history.push(`/products?category=${category}`);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortOrder("none");
    setShowAll(false);
    setFilteredProducts(products);
  };

  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 8); // Show all or first 8 products

  // Handle loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-medium">Loading products...</div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-200 pt-32">
      <div className="container mx-auto p-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Search Bar */}
          <div className="flex items-center gap-2 w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by name..."
              className="p-2 border rounded flex-grow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
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

          {/* Sort by Price */}
          <select
            className="p-2 border rounded w-full md:w-1/4"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>

          {/* Clear Filters Button */}
          <button
            className="bg-pink-500 text-white px-3 py-2 
            rounded hover:bg-pink-600"
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
                  <button className="bg-pink-500 text-white px-3 py-1 rounded shadow hover:bg-pink-600">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
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
