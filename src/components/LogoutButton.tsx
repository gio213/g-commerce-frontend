import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api/api-client";
import { useAppContext } from "../context/AppContext";
import { Button } from "./ui/button";

type LogoutButtonProps = {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
};

const LogoutButton = ({ variant, size }: LogoutButtonProps) => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Logged out successfully", type: "success" });
    },

    onError: (error: Error) => {
      showToast({ message: error.message, type: "error" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <Button
      size={size}
      variant={variant}
      className="w-full"
      onClick={handleClick}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
