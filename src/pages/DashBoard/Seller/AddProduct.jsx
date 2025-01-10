import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../components/Provider/AuthCotext";


const AddProduct = () => {
    const { user } = useContext(AuthContext); // Get sellerName and email from auth context
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("jwt");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formData) => {
        formData.quantity = Number(formData.quantity);
        try {
            setLoading(true);
            // Prepare the form data to be sent
            const newProduct = {
                ...formData,
                sellerName: user.name,
                email: user.email,
            };

            const response = await fetch(
                "https://night-queen-glow-server.vercel.app/products",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newProduct),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add product");
            }

            const data = await response.json();
            alert(data.message || "Product added successfully!");
            navigate("/seller-dashboard"); // Redirect to dashboard after successful add
        } catch (err) {
            setError("Failed to add product");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-pink-50 flex items-center justify-center py-12 px-6">
            <div className="bg-white p-6 rounded shadow-md lg:w-[800px] lg:mx-20">
                <h1 className="text-2xl font-bold text-pink-500 mb-4 text-center">
                    Add New Product
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Seller Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Seller Name</label>
                            <input
                                type="text"
                                value={user.name}
                                readOnly
                                className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Seller Email</label>
                            <input
                                type="text"
                                value={user.email}
                                readOnly
                                className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-pink-300"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <input
                                type="text"
                                {...register("category", { required: "Category is required" })}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-pink-300"
                            />
                            {errors.category && (
                                <p className="text-red-500 text-sm">{errors.category.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="text"
                                {...register("price", { required: "Price is required" })}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-pink-300"
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm">{errors.price.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input
                                type="number"
                                {...register("quantity", { required: "Quantity is required" })}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-pink-300"
                            />
                            {errors.quantity && (
                                <p className="text-red-500 text-sm">{errors.quantity.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-pink-300"
                            rows={4}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            type="text"
                            {...register("image", { required: "Image URL is required" })}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-pink-300"
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm">{errors.image.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 focus:outline-none"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
