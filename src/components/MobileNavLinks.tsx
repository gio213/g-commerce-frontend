import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useAppContext } from "@/context/AppContext";
import LogoutButton from "./LogoutButton";
import { SheetClose } from "./ui/sheet";
const MobileNavLinks = () => {
  const { cartItems, wishListItems } = useAppContext();
  return (
    <>
      <SheetClose asChild>
        <Link
          className="flex items-center font-bold bg-white hover:text-orange-500"
          to="/user-profile"
        >
          User Profile
        </Link>
      </SheetClose>

      <Separator />
      <SheetClose asChild>
        <Link
          to={"/shopping-card"}
          className="flex items-center font-bold bg-white hover:text-orange-500"
        >
          <span className="flex items-center justify-center gap-2">
            <ShoppingBag size={20} />
            Shopping Cart{" "}
            {cartItems.length > 0 && (
              <span className="font-bold text-red-500">
                ({cartItems.length})
              </span>
            )}
          </span>
        </Link>
      </SheetClose>
      <Separator />
      <SheetClose asChild>
        <Link
          to={"/wishlist"}
          className="flex items-center font-bold bg-white hover:text-orange-500"
        >
          <span className="flex items-center justify-center gap-2">
            <Heart size={20} />
            Wish List{" "}
            {wishListItems.length > 0 && (
              <span className="font-bold text-red-500">
                ({wishListItems.length})
              </span>
            )}
          </span>
        </Link>
      </SheetClose>
      <Separator />
      <SheetClose asChild>
        <Link
          to={"/admin-dashboard"}
          className="flex items-center font-bold bg-white hover:text-orange-500"
        >
          <Button variant={"secondary"} className="font-bold bg-green-100">
            <Link to="/admin-dashboard">Admin Dashboard</Link>
          </Button>
        </Link>
      </SheetClose>
      <Separator />

      <LogoutButton variant="secondary" size="default" />
    </>
  );
};

export default MobileNavLinks;
