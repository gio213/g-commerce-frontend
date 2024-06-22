import { useMutation } from "react-query";
import * as apiClient from "../api/api-client";
import { useAppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { BookmarkPlusIcon, Heart } from "lucide-react";

type AddToWhishListButtonProps = {
  productId: string;
  type: "cart" | "wishlist";
};

const AddTo = ({ productId, type }: AddToWhishListButtonProps) => {
  const { user, showToast } = useAppContext();
  const userId = user?._id;
  const navigate = useNavigate();

  const { mutate: addToWishList } = useMutation(
    "addToWishList",
    apiClient.addToWishlist,
    {
      onSuccess: () => {
        showToast({ message: "Added to wishlist", type: "success" });
      },
      onError: () => {
        showToast({ message: "Failed to add to wishlist", type: "error" });
      },
    }
  );

  const { mutate: addToCart } = useMutation("addToCart", apiClient.addToCart, {
    onSuccess: () => {
      showToast({ message: "Added to cart", type: "success" });
    },
    onError: () => {
      showToast({ message: "Failed to add to cart", type: "error" });
    },
  });

  const handleClick = () => {
    if (!userId) {
      showToast({ message: "Please login to add to wishlist", type: "error" });
      navigate("/sign-in");
      return;
    }
    if (type === "wishlist") {
      addToWishList({ productId, userId });
      return;
    }
    if (type === "cart") {
      addToCart({ productId, userId });
      return;
    }
  };

  return (
    <div>
      {type === "wishlist" ? (
        <Heart
          onClick={handleClick}
          className="cursor-pointer hover:fill-red-500"
        />
      ) : (
        <BookmarkPlusIcon
          onClick={handleClick}
          className="cursor-pointer hover:fill-green-500"
        />
      )}
    </div>
  );
};

export default AddTo;
