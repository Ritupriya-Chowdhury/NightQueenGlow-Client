import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import { AuthContext } from "../components/Provider/AuthCotext";
import ReactPaginate from "react-paginate";
import { FaRegStar, FaStar } from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://night-queen-glow-server.vercel.app/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        setProducts(data);
        setFilteredProducts(data);
        setCategories(["All", ...new Set(data.map((product) => product.category))]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
    setCurrentPage(0);
  }, [searchTerm, selectedCategory, sortOrder, products]);

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(offset, offset + productsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (loading) return <div className="text-center">Loading products...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-pink-200 pt-32">
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            className="p-2 border rounded w-full md:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 border rounded w-full md:w-1/4"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            className="p-2 border rounded w-full md:w-1/4"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
              <div className="p-4">
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-lg font-bold text-red-600">{product.price}</p>
                </div>
                <div className="flex items-center mt-2">
          <Rating
            initialRating={product.rating}
            emptySymbol={<FaRegStar className="text-gray-400" />}
            fullSymbol={<FaStar className="text-yellow-400" />}
            readonly
          />
          <span className="ml-2 text-gray-600">{product.ratings}</span>
        </div>
                <div className="mt-3">
                  <div className="flex gap-2">
                    <Link to={`/products/${product._id}`} className="bg-pink-400 text-white px-3 py-1 rounded hover:bg-pink-500">
                      View Details
                    </Link>
                    {user?.role === "buyer" && product.quantity > 0 && (
                      <button className="bg-pink-500 text-white px-3 py-2 rounded hover:bg-pink-600">
                        Add to Wishlist
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredProducts.length > productsPerPage && (
          <div className="flex justify-center mt-6">
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              pageCount={Math.ceil(filteredProducts.length / productsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName="flex gap-2"
              pageClassName="px-3 py-2 border rounded cursor-pointer"
              previousClassName="px-3 py-2 border rounded cursor-pointer"
              nextClassName="px-3 py-2 border rounded cursor-pointer"
              activeClassName="bg-pink-500 text-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
