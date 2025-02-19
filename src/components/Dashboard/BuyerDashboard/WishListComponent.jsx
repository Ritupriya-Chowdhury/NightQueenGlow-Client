import { useContext, useEffect, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { AuthContext } from '../../Provider/AuthCotext';
import Swal from 'sweetalert2';

const WishListComponent = () => {
    const { user, setUser } = useContext(AuthContext);
    const [wishlistProducts, setWishlistProducts] = useState([]);

    useEffect(() => {
        const fetchWishlistDetails = async () => {
            try {
                if (!user?.wishlist || user.wishlist.length === 0) return;

                const productDetails = await Promise.all(
                    user.wishlist.map(async (item) => {
                        const response = await fetch(`https://night-queen-glow-server.vercel.app/products/${item._id}`);
                        if (!response.ok) throw new Error('Failed to fetch product details');
                        return response.json();
                    })
                );

                setWishlistProducts(productDetails);
            } catch (error) {
                console.error(error);
            }
        };

        fetchWishlistDetails();
    }, [user?.wishlist]);

    const handleAddToCart = async (product) => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You are not logged in!',
                });
                return;
            }

            const response = await fetch(`https://night-queen-glow-server.vercel.app/cart/${product._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to add product to cart');

            Swal.fire({
                icon: 'success',
                title: 'Added to Cart',
                text: `${product.name} has been added to your cart!`,
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `${error.message}`,
            });
        }
    };

    const handleDeleteFromWishlist = async (product) => {
        const productId = product._id;

        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You are not logged in!',
                });
                return;
            }

            const response = await fetch(`https://night-queen-glow-server.vercel.app/wishlist/${productId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to remove product from wishlist');

            const updatedUser = { ...user };
            updatedUser.wishlist = updatedUser.wishlist.filter(item => item._id !== productId);
            setUser(updatedUser);

            setWishlistProducts(prev => prev.filter(product => product._id !== productId));

            Swal.fire({
                icon: 'success',
                title: 'Removed',
                text: 'Product removed from wishlist!',
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to remove product from wishlist',
            });
        }
    };

    return (
        <div className='bg-pink-100 md:pl-20 pt-16'>
             <h1 className="text-pink-500 text-2xl md:text-3xl font-bold 
              my-8 md:my-12 ml-12 md:ml-[150px] lg:ml-[120px]">
        Your Wishlist
      </h1>
            {wishlistProducts.length > 0 ? (
        <div className="overflow-x-auto py-4 border border-black mx-2">
          <table className="w-[800px] border-collapse border border-gray-300 mx-4">
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
              {wishlistProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">${product.price}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
                    >
                      Add to Cart
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeleteFromWishlist(product)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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

export default WishListComponent;