import { useAppContext } from "@/context/AppContext";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import AddTo from "@/components/AddTo";
import RemoveItem from "@/components/RemoveItem";
import ClearButton from "@/components/ClearButton";
import EmptyBasketAndWishList from "@/components/EmptyBasketAndWishList";
import { motion } from "framer-motion";

const WishListPage = () => {
  const { wishListItems, addCartItem, removeCartItem } = useAppContext();

  console.log(
    "wishListItems",
    wishListItems.map((item) => item._id)
  );

  if (wishListItems.length === 0) {
    return <EmptyBasketAndWishList title="WishList" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg shadow-lg"
    >
      {wishListItems?.length > 0 && (
        <div className="flex justify-end mb-4">
          <ClearButton
            clearType="wishList"
            className="px-4 py-2 text-white transition-colors bg-red-500 rounded-md hover:bg-red-600"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold text-center text-gray-800">
        {wishListItems?.length} {wishListItems?.length > 1 ? "items" : "item"}{" "}
        in your wishlist
      </h1>
      {wishListItems?.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md"
        >
          <Separator className="bg-gray-300" />
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">{index + 1}</span>
            <img
              src={item?.imagesUrls[0]}
              alt="product img"
              className="w-16 h-16 rounded-md"
            />
            <Link
              to={`/product/detail/${item?._id}`}
              className="font-semibold truncate w-80 text-md hover:underline hover:text-blue-500"
            >
              {item?.name}
            </Link>
            <div>
              <span className="font-semibold text-gray-700 text-md">
                {item?.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <AddTo
              product={item}
              className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
              pageType="productDetail"
              type="cart"
              productId={item?._id}
              onAdd={() => {
                addCartItem(item);
              }}
            />
            <RemoveItem
              id={item.docId!}
              removeType="wishList"
              className="px-4 py-2 text-white transition-colors bg-red-500 rounded-md hover:bg-red-600"
              onRemove={() => {
                removeCartItem(item._id!);
              }}
            />
          </div>
          <Separator className="bg-gray-300" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default WishListPage;
