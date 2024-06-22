import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "react-query";
import { RegisterFormData } from "@/types";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
    <form className="min-h-screen rounded-lg hero " onSubmit={onSubmit}>
      <div className="flex-col hero-content lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign up!</h1>
          <p className="py-6">
            Glad to have you here! Get access to all your orders, wishlist and
            much more by signing up for an account.
          </p>
        </div>
        <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered"
                {...register("firstName", {
                  required: "This field is required",
                })}
                {...(errors.firstName && {
                  className: "input input-bordered input-error",
                })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered"
                {...register("lastName", {
                  required: "This field is required",
                })}
                {...(errors.lastName && {
                  className: "input input-bordered input-error",
                })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                {...register("email", {
                  required: "This field is required",
                })}
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
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered"
                {...register("confirmPassword", {
                  validate: (val) => {
                    if (!val) {
                      return "This field is requierd";
                    } else if (watch("password") !== val) {
                      return "Your password do not match";
                    }
                  },
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
            </div>
            <div className="mt-6 form-control">
              <Button type="submit" className="btn btn-primary">
                Register
              </Button>
            </div>
            <span></span>
            <span className="flex gap-1 text-sm">
              Registered?
              <Link className="text-blue-500 underline" to="/sign-in">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
