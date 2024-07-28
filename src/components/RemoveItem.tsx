import { useAppContext } from "@/context/AppContext";
import * as apiClient from "../../api-client";
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
  const { mutate: removeCartItem, isLoading: isRmoveIngFromCart } = useMutation(
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

  const { mutate: removeWishListItem, isLoading: isRemoveIngFromWishList } =
    useMutation(apiClient.deleteWishList, {
      onSuccess: async () => {
        showToast({ message: "Item removed from wishlist", type: "success" });
      },
      onError: (error: Error) => {
        showToast({ message: error.message, type: "error" });
      },
    });

  const handleRemove = (id: string) => {
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
        handleRemove(id);
        onRemove && onRemove();
      }}
      disabled={isRmoveIngFromCart || isRemoveIngFromWishList}
    >
      Remove
    </Button>
  );
};

export default RemoveItem;
