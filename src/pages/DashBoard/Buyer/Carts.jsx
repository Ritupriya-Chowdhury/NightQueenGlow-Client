import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../components/Provider/AuthCotext";

const Carts = () => {
  const { cartCount } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]); // Stores cart data 

  const fetchCartData = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch("https://night-queen-glow-server.vercel.app/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }

      const cartData = await response.json();
      if (!cartData.products || cartData.products.length === 0) {
        setCartItems([]);
        return;
      }

      // Fetch additional product details for each item
      const enrichedCartItems = await Promise.all(
        cartData.products.map(async (item) => {
          try {
            const productResponse = await fetch(
              `https://night-queen-glow-server.vercel.app/products/${item.productId}`
            );
            if (!productResponse.ok) throw new Error("Product not found");
            const productData = await productResponse.json();

            return {
              ...item,
              name: productData.name,
              price: item.totalPrice, // Using totalPrice from cart
              image: productData.image,
              quantity: item.quantity,
            };
          } catch (error) {
            console.error(`Failed to fetch product details for ${item.productId}:`, error);
            return item;
          }
        })
      );

      setCartItems(enrichedCartItems);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <div className="overflow-y-auto bg-pink-100 min-h-screen w-full md:ml-[80px] lg:ml-0 pt-16">
      <h1 className="text-pink-500 text-2xl md:text-3xl font-bold my-8 md:my-12 ml-12 md:ml-[250px] lg:ml-[200px]">
        Your Cart ({cartCount} Items)
      </h1>

      {cartItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-[800px] border-collapse border border-gray-300 mx-8 md:mx-20 px-8">
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
                <tr key={item.productId} className="hover:bg-gray-100">
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
                    ${item.price.toFixed(2)}
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
