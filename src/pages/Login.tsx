import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api/api-client.ts";
import { useAppContext } from "@/context/AppContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LoginFormData } from "@/types/index.ts";
import { Button } from "@/components/ui/button.tsx";

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
    <form
      className="min-h-screen bg-opacity-50 rounded-lg hero bg-base-200"
      onSubmit={onSubmit}
    >
      <div className="flex-col hero-content lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Get access to all your orders, wishlist and much more by logging in
            to your account.
          </p>
        </div>
        <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: "This field is required" })}
                {...(errors.email && {
                  className: "input input-bordered input-error",
                })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                {...(errors.password && {
                  className: "input input-bordered input-error",
                })}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="mt-6 form-control">
              <Button type="submit" className="btn btn-primary">
                Login
              </Button>
            </div>
            <span>
              <Link className="text-blue-500 underline" to="/password-reset">
                Forgot Password?
              </Link>
            </span>
            <span className="flex gap-1 text-sm">
              Not Registered?
              <Link className="text-blue-500 underline" to="/register">
                Create an account here
              </Link>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
