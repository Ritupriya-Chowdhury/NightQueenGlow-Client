import { useEffect, useState } from 'react';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const ProductsPage = () => {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt'); // Retrieve the JWT token from localStorage

  useEffect(() => {
    const fetchProducts = async () => {
      
      try {
        setLoading(true);
        if ( !token) {
          setError('You are not logged in!');
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://night-queen-glow-server.vercel.app/products-email`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data.products || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const handleDeleteProduct = async (productId) => {
    try {
      if (!token) {
        alert('You are not logged in!');
        return;
      }

      const response = await fetch(
        `https://night-queen-glow-server.vercel.app/products/${productId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Remove the deleted product from the local state
      setProducts(products.filter((product) => product._id !== productId));
      alert('Product deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to delete product');
    }
  };
  const handleUpdateProduct = (productId) => {
    navigate(`/seller-dashboard/update-product/${productId}`);
  };

  

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="py-8 md:py-20 overflow-y-auto bg-pink-100 min-h-screen w-full md:ml-[80px] lg:ml-0">
      <h1 className="text-pink-500 text-2xl md:text-3xl font-bold my-8 md:my-12 ml-12 md:ml-[250px] lg:ml-[200px]">
        Your Products
      </h1>
      {products.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-[800px] border-collapse border border-gray-300 mx-8 md:mx-20 ">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Update</th>
                <th className="border border-gray-300 px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${product.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={()=> handleUpdateProduct(product._id)}
                      className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
                    >
                      <MdEdit />
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="bg-red-500 text-white px-1 md:px-4 py-2 rounded hover:bg-red-600"
                    >
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-4">No products found.</p>
      )}
    </div>
  );
};

export default ProductsPage;
// /seller-dashboard/update-product/${product._id}
