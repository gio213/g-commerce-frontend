import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RemoveItem from "@/components/RemoveItem";
import ClearButton from "@/components/ClearButton";
import { useEffect } from "react";

const ShoppingCard = () => {
  const { cartItems, clearItems, removeCartItem } = useAppContext();

  useEffect(() => {}, [cartItems]);

  if (!cartItems) {
    return <Loading />;
  }

  if (!cartItems || cartItems.length === 0) {
    return <div>No items in cart</div>;
  }

  return (
    <div className="flex flex-col">
      {cartItems.length > 0 && (
        <div className="flex justify-end">
          <ClearButton
            onClear={() => {
              clearItems();
            }}
            clearType="cart"
            className={`mb-4 w-fit disabled:${cartItems.length === 0}`}
          />
        </div>
      )}
      <h1 className="mb-4 text-2xl font-semibold text-center">Shopping Cart</h1>
      <h3 className="mb-2 text-lg font-semibold text-center">
        Unique Items in cart: {cartItems.length}
      </h3>
      {cartItems?.map((product, index) => (
        <div
          key={product.cartItem._id}
          className="flex items-center justify-between p-2 mb-2 bg-white rounded-lg shadow-md"
        >
          {index + 1}
          <img
            src={product.cartItem.imagesUrls[0]}
            alt="product image"
            width={50}
            height={50}
          />
          <div className="w-80">
            <Link to={`/product/detail/${product.cartItem._id}`}>
              <h1 className="font-semibold truncate cursor-pointer font-md text-md hover:underline hover:text-blue-500">
                {product.cartItem.name}
              </h1>
            </Link>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-md">
              ${product.cartItem.price.toFixed(2)}
            </span>
          </div>
          <RemoveItem
            id={product.cartItem._id}
            removeType="cart"
            className="px-2 py-1 text-white bg-red-500 rounded-md"
            onRemove={() => {
              removeCartItem(product.cartItem._id);
            }}
          />
        </div>
      ))}
      <div className="flex items-center justify-between p-2 mb-2 bg-white rounded-lg shadow-md">
        <h1 className="font-semibold text-md">Total</h1>
        <span className="font-semibold text-md">
          $
          {cartItems
            .reduce((acc, product) => acc + product.cartItem.price, 0)
            .toFixed(2)}
        </span>
        {cartItems.length > 0 && (
          <Button className="px-2 py-1 text-white bg-green-500 rounded-md">
            Checkout
          </Button>
        )}
      </div>
    </div>
  );
};

export default ShoppingCard;
