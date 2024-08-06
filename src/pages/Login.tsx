import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api/api-client.ts";
import { useAppContext } from "@/context/AppContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LoginFormData } from "@/types/index.ts";
import { Button } from "@/components/ui/button.tsx";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input.tsx";

const Login = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Logged in successfully", type: "success" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
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
        <h1 className="mb-6 text-3xl font-bold text-center">Login now!</h1>
        <p className="mb-6 text-center text-gray-600">
          Get access to all your orders, wishlist, and much more by logging in
          to your account.
        </p>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Email</label>
          <Input
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
          <Input
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
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/password-reset"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full py-2 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Login
        </Button>
        <div className="mt-6 text-center">
          <p className="text-sm">
            Not Registered?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Create an account here
            </Link>
          </p>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default Login;
