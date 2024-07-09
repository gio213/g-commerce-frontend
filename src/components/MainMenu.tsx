import { HeartIcon, ShoppingBasket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import UserNameMenu from "./UserNameMenu";
import { Button } from "./ui/button";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";

const MainMenu = () => {
  const { isLoggedin, cartItems, wishListItems, addedToCart, addedToWishlist } =
    useAppContext();
  const [cartItemsState, setCartItemsState] = useState(cartItems.length);
  const [wishListItemsState, setWishListItemsState] = useState(
    wishListItems.length
  );
  const navigate = useNavigate();

  useEffect(() => {
    setCartItemsState(cartItems.length);
    setWishListItemsState(wishListItems.length);
  }, [cartItems, wishListItems]);

  useEffect(() => {
    if (addedToCart) {
      setCartItemsState((prev) => prev + 1);
    }
  }, [addedToCart]);

  useEffect(() => {
    if (addedToWishlist) {
      setWishListItemsState((prev) => prev + 1);
    }
  }, [addedToWishlist]);

  return (
    <span className="items-center hidden space-x-2 md:flex">
      {isLoggedin ? (
        <>
          <div className="flex items-center justify-center gap-2">
            <Link
              to="/shopping-card"
              className="font-bold rounded-full hover:bg-customBlue"
            >
              {cartItems.length > 0 ? (
                <div className="relative">
                  <ShoppingBasket size={35} className="hover:fill-green-500" />
                  <span className="absolute top-0 right-0 px-1 text-xs text-white bg-red-500 rounded-full">
                    <p className="text-[7px] font-bold text-white">
                      {cartItemsState}
                    </p>
                  </span>
                </div>
              ) : (
                <ShoppingBasket size={35} className="hover:fill-green-500" />
              )}
            </Link>
            <Link
              to="/wishlist"
              className="font-bold rounded-full hover:bg-customBlue"
            >
              {wishListItems.length > 0 ? (
                <div className="relative">
                  <HeartIcon size={35} className="hover:fill-red-500" />
                  <span className="absolute top-0 right-0 px-1 text-xs text-white bg-red-500 rounded-full">
                    <p className="text-[7px] font-bold text-white">
                      {wishListItemsState}
                    </p>
                  </span>
                </div>
              ) : (
                <HeartIcon size={35} className="hover:fill-green-500" />
              )}
            </Link>
            <UserNameMenu />
          </div>
        </>
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
          onClick={async () => {
            navigate("/sign-in");
          }}
        >
          Log In
        </Button>
      )}
    </span>
  );
};

export default MainMenu;
