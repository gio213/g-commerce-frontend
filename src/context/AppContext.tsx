import React, { useState, createContext, useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api/api-client.ts";
import Toast from "@/components/Toast.tsx";
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
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedin: boolean;
  user: UserType | undefined;
  categories: categoryType[];
  cartItems: ProductType[];
  addCartItem: (cartItem: ProductType) => void;
  clearItems: () => void;
  removeCartItem: (productId: string) => void;
  wishListItems: ProductType[];
  setWishListItems(wishListItems: ProductType[]): void;
  review: ReviewType;
  reviews: ProductReviewType[];
  addReview: (review: ProductReviewType) => void;
  productId: string;
  setProductId: (productId: string) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

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
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });
  const [reviews, setReviews] = useState<ProductReviewType[]>([]);

  const addCartItem = (cartItem: ProductType) => {
    setCartItems((prevItems) => [...prevItems, cartItem]);
  };

  const clearItems = () => {
    setCartItems([]);
  };

  const addReview = (review: ProductReviewType) => {
    setReviews([review, ...reviews]);
  };

  const removeCartItem = (productId: string) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCartItems);
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

  useQuery("cart", apiClient.getCartItems, {
    enabled: !isError,
    onSuccess: (data) => {
      setCartItems(data);
    },
    refetchOnWindowFocus: false,
  });

  useQuery("wishList", apiClient.getWishlistItems, {
    enabled: !isError,
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
    }
  );
  // useQuery<ProductReviewsPaginated>(
  //   ["reviews-paginated", currentPage],
  //   () =>
  //     apiClient.getPaginatedReviews({ page: currentPage }, productId as string),
  //   {
  //     onSuccess: (data) => {
  //       setReviews(data.reviews.reverse());
  //       console.log("reviews", data.reviews);
  //     },
  //     refetchOnWindowFocus: false,
  //     keepPreviousData: true, // to keep the previous data while fetching new data
  //   }
  // );

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedin: !isError,
        user,
        categories: categories || [],
        wishListItems,
        setWishListItems,
        review: {
          comment: "",
          starRating: 0,
          productId: "",
          userId: "",
        },
        reviews,
        addReview,
        productId,
        setProductId,
        cartItems,
        addCartItem,
        clearItems,
        removeCartItem,
        currentPage,
        setCurrentPage,
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
