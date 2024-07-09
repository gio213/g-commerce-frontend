import React, { useState, createContext, useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api/api-client.ts";
import Toast from "@/components/Toast.tsx";
import { categoryType, ProductType, UserType } from "@/types/index.ts";

type ToastMessage = {
  message: string;
  type: "success" | "error";
};

type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedin: boolean;
  user: UserType | undefined;
  cartItems: ProductType[];
  wishListItems: ProductType[];
  categories: categoryType[];
  addedToCart: boolean;
  setAddedToCart: (value: boolean) => void;
  addedToWishlist: boolean;
  setAddedToWishlist: (value: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });
  const user = useQuery("me", apiClient.me, {
    enabled: !isError,
  });
  const cartItems = useQuery("cartItems", apiClient.getCartItems, {
    enabled: !isError,
  });

  const wishListItems = useQuery("wishListItems", apiClient.getWishlistItems, {
    enabled: !isError,
  });

  const categories = useQuery("categories", apiClient.getAllCategories, {
    enabled: !isError,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedin: !isError,
        user: user.data,
        cartItems: cartItems.data || [],
        wishListItems: wishListItems.data || [],
        categories: categories.data || [],
        addedToCart,
        addedToWishlist,
        setAddedToCart,
        setAddedToWishlist,
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
