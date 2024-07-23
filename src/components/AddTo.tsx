import { useMutation } from "react-query";
import * as apiClient from "../api/api-client";
import { useAppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { type ProductType } from "@/types";

type AddTo = {
  productId: string;
  type: "cart" | "wishlist";
  pageType?: "productDetail" | "cart";
  className?: string;
  onAdd?: () => void;
  product: ProductType;
};

const AddTo = ({ productId, type, pageType, className, onAdd }: AddTo) => {
  const { user, showToast } = useAppContext();
  const userId = user?._id;
  const navigate = useNavigate();

  const { mutate: addToWishList, isLoading: isAddingToWishList } = useMutation(
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

  const { mutate: addToCart, isLoading: isAddingToCart } = useMutation(
    "addToCart",
    apiClient.addToCart,
    {
      onSuccess: () => {
        showToast({ message: "Added to cart", type: "success" });
      },
      onError: () => {
        showToast({ message: "Failed to add to cart", type: "error" });
      },
    }
  );

  const handleClick = () => {
    if (!userId) {
      showToast({ message: "Please login to add to wishlist", type: "error" });
      navigate("/sign-in");
      return;
    }
    if (type === "wishlist") {
      addToWishList({ productId, userId });
      onAdd && onAdd();
      return;
    }
    if (type === "cart") {
      addToCart({ productId, userId });
      onAdd && onAdd();
      return;
    }
  };

  return (
    <div>
      {type === "wishlist" ? (
        pageType === "productDetail" ? (
          <button
            disabled={isAddingToWishList}
            onClick={() => {
              handleClick();
            }}
            className={`flex items-center px-4 py-2 text-white transition duration-300 bg-pink-500 rounded-lg hover:bg-pink-600 ${className}`}
          >
            <Heart className="mr-2" /> Wishlist
          </button>
        ) : (
          <Heart
            onClick={() => {
              handleClick();
            }}
            className={
              isAddingToWishList
                ? "disabled mr-2 cursor-not-allowed"
                : "mr-2 cursor-pointer hover:fill-red-500"
            }
          />
        )
      ) : pageType === "productDetail" ? (
        <button
          disabled={isAddingToCart}
          onClick={() => {
            handleClick();
          }}
          className={`flex items-center px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600${className}`}
        >
          <ShoppingCart className="mr-2" /> Add to Cart
        </button>
      ) : (
        <ShoppingCart
          onClick={handleClick}
          className={
            isAddingToCart
              ? "disabled mr-2 cursor-not-allowed"
              : "mr-2 cursor-pointer hover:fill-green-500"
          }
        />
      )}
    </div>
  );
};

export default AddTo;
