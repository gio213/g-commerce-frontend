import { useAppContext } from "@/context/AppContext";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import AddTo from "@/components/AddTo";
import RemoveItem from "@/components/RemoveItem";
import ClearButton from "@/components/ClearButton";

const WishListPage = () => {
  const { wishListItems, addCartItem, removeCartItem } = useAppContext();

  return (
    <div className="flex flex-col gap-2">
      {wishListItems?.length > 0 && (
        <div className="flex justify-end">
          <ClearButton clearType="wishList" className={`mb-4 w-fit disabled`} />
        </div>
      )}
      <h1 className="text-center">
        {wishListItems?.length} {wishListItems?.length > 1 ? "items" : "item"}{" "}
        in your wishlist
      </h1>
      {wishListItems?.map((item, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Separator className="bg-white" />
          <div className="flex items-center justify-between">
            {index + 1}
            <img
              src={item?.wishListItem.imagesUrls[0]}
              alt="product img"
              width={50}
              height={50}
            />
            <Link
              to={`/product/detail/${item?.wishListItem._id}`}
              className="w-80 hover:underline hover:text-blue-500 "
            >
              {item?.wishListItem.name}
            </Link>
            <div className="items-center ">
              <span className="font-semibold text-md">
                €{item?.wishListItem.price}
              </span>
            </div>
            <div>
              <span className="font-semibold text-md">
                {item?.wishListItem.countInStock > 0
                  ? "In Stock"
                  : "Out of Stock"}
              </span>
            </div>
            <AddTo
              product={item}
              className="px-2 py-1 text-white bg-blue-500 rounded-md"
              pageType="productDetail"
              type="cart"
              productId={item?.wishListItem._id}
              onAdd={() => {
                addCartItem(item);
              }}
            />
            <RemoveItem
              id={item?.wishListItem._id}
              removeType="wishList"
              className="px-2 py-1 text-white bg-red-500 rounded-md "
              onRemove={() => {
                removeCartItem(item.wishListItem._id);
              }}
            />
          </div>
          <Separator className="bg-white" />
        </div>
      ))}
    </div>
  );
};

export default WishListPage;
