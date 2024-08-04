import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RemoveItem from "@/components/RemoveItem";
import ClearButton from "@/components/ClearButton";
import EmptyBasketAndWishList from "@/components/EmptyBasketAndWishList";
import { motion } from "framer-motion";

const ShoppingCard = () => {
  const { cartItems, clearItems, removeCartItem } = useAppContext();
  const navigate = useNavigate();

  if (!cartItems) {
    return <Loading />;
  }

  // Filtering out any undefined items (defensive coding)
  const validCartItems = cartItems.filter((item) => item !== undefined);

  if (validCartItems.length === 0) {
    return <EmptyBasketAndWishList title="Shopping Cart" />;
  }

  // Grouping items by _id
  const groupedItems = validCartItems.reduce(
    (acc, item) => {
      if (!item) return acc;
      if (!acc[item._id]) {
        acc[item._id] = { ...item, quantity: 0 };
      }
      acc[item._id].quantity += 1;
      return acc;
    },
    {} as Record<string, (typeof validCartItems)[0] & { quantity: number }>
  );

  const uniqueItems = Object.values(groupedItems);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-lg"
    >
      {uniqueItems.length > 0 && (
        <div className="flex justify-end mb-4">
          <ClearButton
            onClear={() => {
              clearItems();
            }}
            clearType="cart"
            className={`w-fit px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors ${
              uniqueItems.length === 0 ? "disabled" : ""
            }`}
          />
        </div>
      )}
      <h1 className="mb-4 text-3xl font-bold text-center text-gray-800">
        Shopping Cart
      </h1>
      <h3 className="mb-4 text-lg font-medium text-center text-gray-600">
        Unique Items in cart: {uniqueItems.length}
      </h3>
      {uniqueItems.map((product, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md"
        >
          <span className="text-lg font-medium">{index + 1}</span>
          {product.imagesUrls && product.imagesUrls.length > 0 ? (
            <img
              src={product.imagesUrls[0]}
              alt="product image"
              className="w-16 h-16 rounded-md"
            />
          ) : (
            <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-md">
              No image available
            </div>
          )}
          <div className="w-80">
            <Link to={`/product/detail/${product._id}`}>
              <h1 className="font-semibold truncate cursor-pointer text-md hover:underline hover:text-blue-500">
                {product.name}
              </h1>
            </Link>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-700 text-md">
              ${product.price ? product.price.toFixed(2) : "N/A"}
            </span>
            <span className="ml-2 text-gray-500">x{product.quantity}</span>
          </div>
          <RemoveItem
            id={product._id!}
            removeType="cart"
            className="px-4 py-2 text-white transition-colors bg-red-500 rounded-md hover:bg-red-600"
            onRemove={() => {
              removeCartItem(product._id!);
            }}
          />
        </div>
      ))}
      <div className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md">
        <h1 className="text-lg font-semibold text-gray-800">Total</h1>
        <span className="text-lg font-semibold text-gray-800">
          €
          {uniqueItems
            .reduce(
              (acc, product) => acc + (product.price || 0) * product.quantity,
              0
            )
            .toFixed(2)}
        </span>
        {uniqueItems.length > 0 && (
          <Button
            onClick={() => navigate("/create-order")}
            className="px-4 py-2 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
          >
            Checkout
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ShoppingCard;
