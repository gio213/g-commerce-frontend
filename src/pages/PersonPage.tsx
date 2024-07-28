import { useAppContext } from "@/context/AppContext";
import { UpdateUser } from "@/types";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const PersonPage = () => {
  const { user, showToast } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUser>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      role: user?.role,
      newPassword: "",
    },
  });

  const { mutate: updateUserMutation, isLoading } = useMutation(
    (userData: UpdateUser) => apiClient.updateUser(user!._id, userData),
    {
      onError: (error) => {
        console.error(error);
        showToast({ message: "An error occurred", type: "error" });
      },
      onSuccess: () => {
        showToast({ message: "User updated successfully", type: "success" });
      },
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen"
    >
      <motion.form
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
        onSubmit={handleSubmit((data) => {
          updateUserMutation(data);
        })}
      >
        <h1 className="mb-6 text-3xl font-bold text-center">Person Page</h1>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">First Name</label>
          <Input
            type="text"
            {...register("firstName")}
            disabled
            placeholder="First Name"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Last Name</label>
          <Input
            type="text"
            {...register("lastName")}
            disabled
            placeholder="Last Name"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Email</label>
          <Input
            type="email"
            {...register("email")}
            disabled
            placeholder="Email"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">New Password</label>
          <Input
            type="password"
            placeholder="New Password"
            {...register("newPassword", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
              errors.newPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Role</label>
          <Input
            {...register("role")}
            disabled
            placeholder="Role"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </motion.form>
    </motion.div>
  );
};

export default PersonPage;
