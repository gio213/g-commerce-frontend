import { useAppContext } from "../context/AppContext";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { Button } from "./ui/button";

type ClearButtonProps = {
  className?: string;
  clearType?: "cart" | "wishList";
  onClear?: () => void;
};

const ClearButton = ({ className, clearType, onClear }: ClearButtonProps) => {
  const { showToast } = useAppContext();
  const { mutate: clearCart } = useMutation(apiClient.clearCart, {
    onSuccess: async () => {
      showToast({ message: "Cart cleared", type: "success" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "error" });
    },
  });

  const { mutate: clearWishlist } = useMutation(apiClient.clearWishlist, {
    onSuccess: async () => {},
    onError: (error: Error) => {
      showToast({ message: error.message, type: "error" });
    },
  });
  const handleClear = () => {
    switch (clearType) {
      case "cart":
        clearCart();
        onClear && onClear();
        break;
      case "wishList":
        clearWishlist();
        onClear && onClear();
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Button
        size={"sm"}
        variant={"destructive"}
        className={`bg-red-500 text-white hover:bg-red-600 ${className}`}
        onClick={handleClear}
      >
        Clear {clearType}
      </Button>
    </>
  );
};

export default ClearButton;
