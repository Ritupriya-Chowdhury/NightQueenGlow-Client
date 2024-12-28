import { useContext } from 'react';
import { AuthContext } from '../../../components/Provider/AuthCotext';
import { MdDeleteOutline } from 'react-icons/md';

const Wishlist = () => {
  const { user, setUser } = useContext(AuthContext); // Access user data and setUser function from authContext

  const handleAddToCart = async (product) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('jwt');

      if (!token) {
        alert('You are not logged in!');
        return;
      }

      // Make API call to add the product to the cart
      const response = await fetch(
        `https://night-queen-glow-server.vercel.app/cart/${product._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include JWT token for authorization
          },
          
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error(error);
      alert('Failed to add product to cart');
    }
  };


  


  const handleDeleteFromWishlist = async (productId) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('jwt');

      if (!token) {
        alert('You are not logged in!');
        return;
      }

      // Make API call to delete the product from wishlist
      const response = await fetch(`https://night-queen-glow-server.vercel.app/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Include JWT token from localStorage
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove product from wishlist');


      }

      // Successfully removed from wishlist, now update the local state
      const updatedUser = { ...user };
      updatedUser.wishlist = updatedUser.wishlist.filter(product => product.id !== productId);
      setUser(updatedUser); // Update user context with the updated wishlist

      alert('Product removed from wishlist!');
    } catch (error) {
      console.error(error);
      alert('Failed to remove product from wishlist');
    }
  };

  return (
    <div className="py-4 md:py-12 overflow-y-auto  bg-pink-100 min-h-screen w-full md:ml-[80px] lg:ml-0">
      <h1 className="text-pink-500 text-2xl md:text-3xl font-bold my-8 md:my-12 ml-32 md:ml-[200px] lg:ml-[400px]">
        Your Wishlist</h1>
      {user?.wishlist && user.wishlist.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-[800px] border-collapse border border-gray-300 mx-8 md:mx-20 ">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Add to Cart</th>
                <th className="border border-gray-300 px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {user.wishlist.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() =>  handleAddToCart(product)}
                      className={`${
                       
                           'bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600'
                      }`}
                    >
                     Add to Cart
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeleteFromWishlist(product._id)}
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
        <p className="text-gray-600 text-center mt-4">No product found.</p>
      )}
    </div>
  );
};

export default Wishlist;
