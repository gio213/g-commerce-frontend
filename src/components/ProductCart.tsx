import { ProductType } from "@/types";
import AddTo from "./AddTo";
import { Link } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

type ProductCartProps = {
  product: ProductType;
};

const ProductCard = ({ product }: ProductCartProps) => {
  const { addCartItem, addWishListItem } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col w-full h-auto my-4 overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md sm:w-64 sm:my-10 sm:h-96 group"
    >
      <Link
        to={`/product/detail/${product._id}`}
        className="relative flex h-48 mx-2 mt-3 overflow-hidden sm:mx-3 rounded-xl"
      >
        <img
          className="absolute top-0 right-0 object-cover w-full h-full peer"
          src={product.imagesUrls[0]}
          alt="product image"
        />
        <img
          className="absolute top-0 object-cover w-full h-full transition-all duration-1000 delay-100 peer -right-96 hover:right-0 peer-hover:right-0"
          src={product.imagesUrls[1] || product.imagesUrls[0]}
          alt="product image"
        />
      </Link>
      <div className="px-4 pb-5 mt-4 sm:px-5">
        <Link to={`/product/detail/${product._id}`}>
          <h5 className="text-lg tracking-tight font-noto sm:text-xl text-slate-900 line-clamp-2">
            {product.name}
          </h5>
        </Link>
        <div className="flex items-center justify-between mt-2 mb-5">
          <div className="p-1 bg-green-200 rounded-full shadow-lg">
            <span className="text-sm font-bold text-gray-800">
              €{product.price}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <AddTo
            product={product}
            className="items-center justify-center flex-1 w-full"
            pageType="productDetail"
            type="cart"
            productId={product._id}
            onAdd={() => addCartItem(product)}
          />
          <AddTo
            className="items-center justify-center flex-1 w-full"
            pageType="productDetail"
            type="wishlist"
            productId={product._id}
            product={product}
            onAdd={() => addWishListItem(product)}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
