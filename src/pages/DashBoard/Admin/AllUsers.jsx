import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

const AllUsers = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from the server
  const fetchUsers = async () => {
    try {
      setLoading(true);

      // Retrieve the token from localStorage
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("You are not logged in!");
      }

      const response = await fetch(
        "https://night-queen-glow-server.vercel.app/users",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data); // Store users in the state
    } catch (err) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Make Admin Functionality
  const handleMakeAdmin = async (userId) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        alert("You are not logged in!");
        return;
      }

      const response = await fetch(
        `https://night-queen-glow-server.vercel.app/users/update-role/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`, 
          },
          body: JSON.stringify({
            role: "admin", 
          }),
        }
      );
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to make user admin");
      }

      // Update local state to reflect admin role
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: "admin" } : user
        )
      );
      alert("User is now an Admin!");
    } catch (error) {
      console.error(error);
      alert("Failed to make user admin");
    }
  };

  // Make Seller Functionality
  const handleMakeSeller = async (userId) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        alert("You are not logged in!");
        return;
      }

      const response = await fetch(
        `https://night-queen-glow-server.vercel.app/users/update-role/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`, 
          },
          body: JSON.stringify({
            role: "seller", 
          }),
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to make user seller");
      }

      // Update local state to reflect seller role
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: "seller" } : user
        )
      );
      alert("User is now a Seller!");
    } catch (error) {
      console.error(error);
      alert("Failed to make user seller");
    }
  };

  // Delete user by ID
  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        alert("You are not logged in!");
        return;
      }

      const response = await fetch(
        `https://night-queen-glow-server.vercel.app/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove the deleted user from the local state
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      alert("User deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="py-4 md:py-12 bg-pink-100 min-h-screen w-full md:ml-[80px] overflow-y-auto lg:ml-0">
      <h1 className="text-pink-500 text-2xl md:text-3xl font-bold 
      ml-32 md:ml-[200px] my-8 md:my-12 lg:ml-[400px]">
        All Users
      </h1>

      {loading ? (
        <p className="text-gray-600 text-center mt-4">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center mt-4">{error}</p>
      ) : users.length > 0 ? (
        <div className="overflow-x-auto">
         
          <table className="w-[1000px] border-collapse border border-gray-300 mx-8 md:mx-20">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Role</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.role}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className={`bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 ${
                        user.role === "admin" ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={user.role === "admin"}
                    >
                      Make Admin
                    </button>
                    <button
                      onClick={() => handleMakeSeller(user._id)}
                      className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2 ${
                        user.role === "admin" || user.role === "seller"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={user.role === "admin" || user.role === "seller"}
                    >
                      Make Seller
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                    >
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
                
              ))
             }
            </tbody>
          </table>
        
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-4">No users found.</p>
      )}
    </div>
  );
};

export default AllUsers;
