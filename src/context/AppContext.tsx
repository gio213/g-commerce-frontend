import React, { useState, createContext, useContext, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "../api/api-client.ts";
import Toast from "@/components/Toast.tsx";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = (import.meta.env.VITE_STRIPE_PUB_KEY as string) || "";

import type {
  categoryType,
  ProductDetailPageData,
  ProductReviewType,
  ProductType,
  UserType,
} from "@/types/index.ts";

type ToastMessage = {
  message: string;
  type: "success" | "error";
};

type ReviewType = {
  comment: string;
  starRating: number;
  productId: string;
  userId: string;
};

type AppContextType = {
  stripePromise: Promise<Stripe | null>;
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedin: boolean;
  user: UserType | undefined;
  categories: categoryType[];
  cartItems: ProductType[];
  addCartItem: (item: ProductType) => void;
  wishListItems: ProductType[];
  addWishListItem: (wishListItem: ProductType) => void;
  clearItems: () => void;
  cleartWishList: () => void;
  removeCartItem: (productId: string) => void;
  removeWishListItem: (productId: string) => void;
  review: ReviewType;
  reviews: ProductReviewType[];
  addReview: (review: ProductReviewType) => void;
  removeReview: (reviewId: string) => void;
  productId: string;
  setProductId: (productId: string) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  previewAdded: boolean;
  addPreview: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [wishListItems, setWishListItems] = useState<ProductType[]>([]);
  const [productId, setProductId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [previewAdded, setPreviewAdded] = useState(false);

  const addPreview = () => {
    setPreviewAdded(true);
    return true;
  };

  useEffect(() => {
    if (previewAdded) {
      const timer = setTimeout(() => {
        setPreviewAdded(false);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [previewAdded]);

  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });
  const [reviews, setReviews] = useState<ProductReviewType[]>([]);

  const addCartItem = (cartItem: ProductType) => {
    setCartItems((prevItems) => [...prevItems, { ...cartItem }]);
  };

  const addWishListItem = (wishListItem: ProductType) => {
    setWishListItems((prevItems) => [...prevItems, { ...wishListItem }]);
  };

  const clearItems = () => {
    setCartItems([]);
    clearCartFromDb();
  };

  const cleartWishList = () => {
    setWishListItems([]);
    clearWishListFromDb();
  };

  const addReview = (review: ProductReviewType) => {
    setReviews([review, ...reviews]);
  };

  const removeReview = (reviewId: string) => {
    const updatedReviews = reviews.filter((review) => review._id !== reviewId);
    setReviews(updatedReviews);
  };

  const removeCartItem = (productId: string) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCartItems);
  };

  const removeWishListItem = (productId: string) => {
    const updatedWishListItems = wishListItems.filter(
      (item) => item._id !== productId
    );
    setWishListItems(updatedWishListItems);
  };

  const { data: user } = useQuery("me", apiClient.me, {
    enabled: !isError,
  });

  const { data: categories } = useQuery(
    "categories",
    apiClient.getAllCategories,
    {
      enabled: !isError,
    }
  );

  const { mutate: clearCartFromDb } = useMutation(apiClient.clearCart);
  const { mutate: clearWishListFromDb } = useMutation(apiClient.clearWishlist);

  useQuery("cart", apiClient.getCartItems, {
    enabled: !!user?._id,
    onSuccess: (data) => {
      setCartItems(data);
    },
    onError: (error) => {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
    },
    refetchOnWindowFocus: false,
  });

  useQuery("wishList", apiClient.getWishlistItems, {
    enabled: !!user?._id,
    onSuccess: (data) => {
      setWishListItems(data);
    },
    refetchOnWindowFocus: false,
  });

  useQuery<ProductDetailPageData, Error>(
    ["product", productId],
    () => apiClient.getProductById(productId as string),
    {
      onSuccess: (data) => {
        setReviews(data.reviews.reverse());
      },
      refetchOnWindowFocus: false,
      enabled: !!productId,
    }
  );

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedin: !isError,
        stripePromise,
        user,
        categories: categories || [],
        cartItems,
        addCartItem,
        wishListItems,
        addWishListItem,
        clearItems,
        cleartWishList,
        removeCartItem,
        removeWishListItem,
        review: {
          comment: "",
          starRating: 0,
          productId: "",
          userId: "",
        },
        reviews,
        addReview,
        removeReview,
        productId,
        setProductId,
        currentPage,
        setCurrentPage,
        previewAdded,
        addPreview,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};
