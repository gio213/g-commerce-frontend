import { useAppContext } from "@/context/AppContext";
import { UpdateUser } from "@/types";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api/api-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
        // handle the error
        console.error(error);
        showToast({ message: "An error occurred", type: "error" });
      },
      onSuccess: () => {
        showToast({ message: "User updated successfully", type: "success" });
      },
    }
  );

  return (
    <div>
      <h1>Person Page</h1>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit((data) => {
          updateUserMutation(data);
        })}
      >
        <Input type="text" {...register("firstName")} />
        <Input type="text" {...register("lastName")} />
        <Input type="email" {...register("email")} />
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
          {...(errors.newPassword?.message && {
            className: "input input-error",
          })}
        />
        <Input {...register("role")} disabled />
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PersonPage;
