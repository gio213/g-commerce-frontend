import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api/api-client.ts";
import { useAppContext } from "@/context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { RegisterFormData } from "@/types/index.ts";
import { Button } from "@/components/ui/button.tsx";
import { motion } from "framer-motion";

const Register = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Account created successfully", type: "success" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "error" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen "
    >
      <motion.form
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
        onSubmit={onSubmit}
      >
        <h1 className="mb-6 text-3xl font-bold text-center">Sign up!</h1>
        <p className="mb-6 text-center text-gray-600">
          Glad to have you here! Get access to all your orders, wishlist, and
          much more by signing up for an account.
        </p>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">First Name</label>
          <input
            type="text"
            placeholder="Enter your first name"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            {...register("confirmPassword", {
              validate: (val) => {
                if (!val) {
                  return "This field is required";
                } else if (watch("password") !== val) {
                  return "Passwords do not match";
                }
              },
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full py-2 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Register
        </Button>
        <div className="mt-6 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default Register;
