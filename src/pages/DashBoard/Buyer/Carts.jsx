import { useContext } from 'react';
import { AuthContext } from '../../../components/Provider/AuthCotext';

const Carts = () => {
  const { cartItems, cartCount } = useContext(AuthContext); // Access cart data and count from context

  return (
    <div className="py-4 md:py-12 overflow-y-auto bg-pink-100 min-h-screen w-full md:ml-[80px] lg:ml-0">
      <h1 className="text-pink-500 text-2xl md:text-3xl font-bold  my-8 md:my-12  ml-12 md:ml-[250px] lg:ml-[200px]">
        Your Cart ({cartCount} Items)
      </h1>

      {cartItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-[800px]  border-collapse border border-gray-300 mx-8 md:mx-20 px-8">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Product Name</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-4">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Carts;
