import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "react-query";
import { RegisterFormData } from "@/types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api/api-client.ts";
import { useAppContext } from "@/context/AppContext.tsx";
const Register = () => {
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Account created successfully", type: "success" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: async (error: Error) => {
      console.error(error);
      showToast({ message: error.message, type: "error" });
    },
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col gap-5 md:flex-row">
        <label className="flex-1 text-sm font-bold text-gray-700">
          First Name
          <input
            className="w-full px-2 py-1 font-normal border rounded"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="flex-1 text-sm font-bold text-gray-700">
          Last Name
          <input
            className="w-full px-2 py-1 font-normal border rounded"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="flex-1 text-sm font-bold text-gray-700">
        Email
        <input
          type="email"
          className="w-full px-2 py-1 font-normal border rounded"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <div />
      <label className="flex-1 text-sm font-bold text-gray-700">
        Password
        <input
          type="password"
          className="w-full px-2 py-1 font-normal border rounded"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="flex-1 text-sm font-bold text-gray-700">
        Confrim Password
        <input
          type="password"
          className="w-full px-2 py-1 font-normal border rounded"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is requierd";
              } else if (watch("password") !== val) {
                return "Your password do not match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <Button type="submit" className="p-2 text-lg font-bold">
          Create Account
        </Button>
      </span>
    </form>
  );
};

export default Register;
