import { useAppContext } from "@/context/AppContext";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import AddTo from "@/components/AddTo";

const WishListPage = () => {
  const { wishListItems } = useAppContext();
  return (
    <div className="flex flex-col gap-2">
      {wishListItems.map((item, index) => (
        <div className="flex flex-col gap-2">
          <Separator className="bg-white" />
          <div key={index} className="flex items-center justify-between">
            {index + 1}
            <img
              src={item.productId.imagesUrls[0]}
              alt="product img"
              width={50}
              height={50}
            />
            <Link
              to={`/product/detail/${item.productId._id}`}
              className="w-80 hover:underline hover:text-blue-500 "
            >
              {item.productId.name}
            </Link>
            <div className="items-center ">
              <span className="font-semibold text-md">
                €{item.productId.price}
              </span>
            </div>
            <div>
              <span className="font-semibold text-md">
                {item.productId.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <AddTo
              pageType="productDetail"
              type="cart"
              productId={item.productId._id}
            />
          </div>
          <Separator className="bg-white" />
        </div>
      ))}
    </div>
  );
};

export default WishListPage;
