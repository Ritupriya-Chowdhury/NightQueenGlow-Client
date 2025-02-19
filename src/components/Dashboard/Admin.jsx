import { useEffect, useState } from "react";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Admin = () => {
  const [users, setUserCount] = useState(0);
  const [products, setProductCount] = useState(0);
  const [order, setCartCount] = useState(0);
  const [revenue, setRevenue] = useState(0); // Placeholder for revenue

  // Fetch the count of users
  const fetchUserCount = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("You are not logged in!");
      }

      const response = await fetch("https://night-queen-glow-server.vercel.app/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUserCount(data.length); // Assuming the API returns an array of users
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  // Fetch the count of products
  const fetchProductCount = async () => {
    try {
      const response = await fetch('https://night-queen-glow-server.vercel.app/products');
      const data = await response.json();
      setProductCount(data.length);
    } catch (error) {
      console.error('Error fetching product count:', error);
    }
  };

  // Fetch the count of carts
  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("You are not logged in!");
      }

      const response = await fetch('https://night-queen-glow-server.vercel.app/all-order', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      console.log(data)
      const totalProducts = data.reduce((count, order) => count + order.products.length, 0);
      setCartCount(totalProducts);// Assuming the API returns an array of orders/carts
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  const fetchRevenue = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("You are not logged in!");
      }
  
      const response = await fetch('https://night-queen-glow-server.vercel.app/all-order', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
  
      const data = await response.json();
      console.log(data);
  
      // Calculate total revenue from all products
      const totalRevenue = data.reduce((sum, order) => {
        return sum + order.products.reduce((orderSum, product) => orderSum + product.totalPrice, 0);
      }, 0);
  
      setRevenue(totalRevenue); // Set the calculated revenue
    } catch (error) {
      console.error('Error fetching revenue:', error);
    }
  };

  useEffect(() => {
    fetchUserCount();
    fetchProductCount();
    fetchCartCount();
    fetchRevenue();
  }, []);

  // Data for the graph
  const data = [
    { name: 'Users', value: users },
    { name: 'Orders', value: order },
    { name: 'Revenue', value: revenue },
  ];



  return (
    <div className="md:ml-[90px] lg:ml-0 px-12 py-16 bg-pink-100 min-h-screen w-screen overflow-x-auto">
      <h1 className="text-pink-500 text-2xl md:text-3xl font-bold 
              my-8 md:my-12 ">Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        <StatCard title="Total Users" count={users} icon={<FaUsers />} />
        <StatCard
          title="Total Products"
          count={products}
          icon={<FaBoxOpen />}
        />
        <StatCard
          title="Total Orders"
          count={order}
          icon={<FaShoppingCart />}
        />
        <StatCard
          title="Total Revenue"
          count={revenue}
          icon={<FaDollarSign />}
        />
      </div>
      
      {/* Bar Chart for Products, Orders, and Revenue */}
      <div className="mt-8">
        <h2 className="text-pink-500 text-2xl md:text-3xl font-bold 
              my-8 md:my-12">Admin Statistics (Bar Chart)</h2>
        <div className="w-full max-w-3xl mx-auto">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
          
              <Bar dataKey="value" fill="#f788bf" /> {/* Orders */}
              
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Management */}
      <div className="mt-8">
        <h2 className="text-pink-500 text-2xl md:text-3xl font-bold 
              my-8 md:my-12">Manage Users</h2>
        <div className="bg-white p-4 mt-4 shadow-md rounded-lg">
          <Link to='/admin-dashboard/all-users'><button className="bg-pink-500 text-white p-2 rounded-md">All Users</button></Link>
          <p className="mt-4">You can see all users and change user&apos;s role.</p>
        </div>
      </div>
    </div>
  );
};

     



// eslint-disable-next-line react/prop-types
const StatCard = ({ title, count, icon }) => (
  <div className="bg-white p-4 shadow-md rounded-lg flex items-center space-x-3">
    <div className="text-3xl text-pink-500 ">{icon}</div>
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-xl font-bold">{count}</p>
    </div>
  </div>
);

export default Admin;
