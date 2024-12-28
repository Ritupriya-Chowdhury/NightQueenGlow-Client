import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const { id } = useParams(); // Get product ID from route params
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("jwt"); // Get JWT token
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
     
                const response = await fetch(
                    `https://night-queen-glow-server.vercel.app/products/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
     
                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }
     
                const data = await response.json();
                // console.log(data)
                setLoading(false);
     
                // console.log("Fetched data:", data); // Log the data to check
     
                // Set the default values in the form
                Object.keys(data).forEach((key) => {
                    if (key === "price" && typeof data[key] === "number") {
                        setValue(key, data[key].toString());
                    } else {
                        setValue(key, data[key] || ""); // Ensure description is set
                    }
                });
            } catch (err) {
                console.error(err);
                setError("Failed to load product data");
                setLoading(false);
            }
        };
     
        fetchProduct();
     }, [id, token, setValue]);
     

     const onSubmit = async (formData) => {
        try {
            // Explicitly ensure price is a string before sending
            formData.price = formData.price.toString();
    
            // Correctly convert quantity to a number
            formData.quantity = Number(formData.quantity);
    
            const response = await fetch(
                `https://night-queen-glow-server.vercel.app/products/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            console.log(response);
    
            if (!response.ok) {
                throw new Error("Failed to update product");
            }
    
            const data = await response.json();
            alert(data.message || "Product updated successfully!");
            navigate("/seller-dashboard"); 
        } catch (err) {
            console.error(err);
            alert("Failed to update product");
        }
    };
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-pink-50 flex items-center justify-center py-12 px-6">
            <div className="bg-white p-6 rounded shadow-md lg:w-[800px] lg:mx-20">
                <h1 className="text-2xl font-bold text-pink-500 mb-4 text-center">
                    Update Product
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                className="w-full px-4 py-2 border rounded focus:outline-none 
                                focus:ring focus:ring-pink-300"
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
                                className="w-full px-4 py-2 border
                                 rounded focus:outline-none focus:ring focus:ring-pink-300"
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
                                className="w-full px-4 py-2 border 
                                rounded focus:outline-none focus:ring focus:ring-pink-300"
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
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;
