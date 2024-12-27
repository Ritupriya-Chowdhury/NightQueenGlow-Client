import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Provider/AuthCotext"; // Import the AuthContext

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/[a-z]/, "Must include at least one lowercase letter")
    .matches(/[0-9]/, "Must include at least one number")
    .matches(/[@$!%*?&#]/, "Must include at least one special character"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const { createUser } = useContext(AuthContext); // Use the createUser function from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerMessage("");

    try {
      const result = await createUser(data.email, data.password, data.name); 
      console.log(result)// Register the user with the context
      setServerMessage("Registration successful!");
      reset(); // Reset form inputs
      setTimeout(() => {
        navigate("/"); // Redirect to the home page after a short delay
      }, 1500);
    } catch (error) {
      setServerMessage("An error occurred. Please try again.",error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Show Password */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              className="mr-2"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword" className="text-sm text-gray-600">
              Show Password
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Sign Up"}
          </button>
        </form>

        {/* Server Response Message */}
        {serverMessage && (
          <p
            className={`mt-4 text-center text-sm ${
              serverMessage === "Registration successful!"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {serverMessage}
          </p>
        )}

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account? <br /> Go to{" "}
          <Link to="/" className="text-pink-500 hover:underline">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
