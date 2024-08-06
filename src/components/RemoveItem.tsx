import { useAppContext } from "@/context/AppContext";
import * as apiClient from "../api/api-client";
import { useMutation } from "react-query";
import { Button } from "./ui/button";

type RemoveItemProps = {
  id: string;
  removeType?: "cart" | "wishList";
  className?: string;
  onRemove?: () => void;
};

const RemoveItem = ({
  id,
  removeType,
  className,
  onRemove,
}: RemoveItemProps) => {
  const { showToast } = useAppContext();

  const { mutate: removeCartItem, isLoading: isRemovingFromCart } = useMutation(
    apiClient.deleteCartItem,
    {
      onSuccess: async () => {
        showToast({ message: "Item removed from cart", type: "success" });
      },
      onError: (error: Error) => {
        showToast({ message: error.message, type: "error" });
      },
    }
  );

  const { mutate: removeWishListItem, isLoading: isRemovingFromWishList } =
    useMutation(apiClient.deleteWishList, {
      onSuccess: async () => {
        showToast({ message: "Item removed from wishlist", type: "success" });
      },
      onError: (error: Error) => {
        showToast({ message: error.message, type: "error" });
      },
    });

  const handleRemove = () => {
    if (removeType === "cart") {
      removeCartItem(id);
    } else {
      removeWishListItem(id);
    }
  };

  return (
    <Button
      className={className}
      size="sm"
      variant="destructive"
      onClick={() => {
        handleRemove();
        onRemove && onRemove();
      }}
      disabled={isRemovingFromCart || isRemovingFromWishList}
    >
      Remove
    </Button>
  );
};

export default RemoveItem;
