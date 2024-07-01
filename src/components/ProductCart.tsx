import { ProductType } from "@/types";
import AddTo from "./AddTo";
import { Link } from "react-router-dom";

type ProductCartProps = {
  product: ProductType;
};

const ProductCard = ({ product }: ProductCartProps) => {
  return (
    <div className="flex flex-col w-64 my-10 overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md h-96 group">
      <Link
        to={`/product/detail/${product._id}`}
        className="relative flex h-48 mx-3 mt-3 overflow-hidden rounded-xl"
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
      <div className="px-5 pb-5 mt-4">
        <Link to={`/product/detail/${product._id}`}>
          <h5 className="text-xl tracking-tight text-slate-900 line-clamp-2">
            {product.name}
          </h5>
        </Link>
        <div className="flex items-center justify-between mt-2 mb-5">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              €{product.price}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <AddTo
            className="items-center justify-center flex-1 w-full"
            pageType="productDetail"
            type="cart"
            productId={product._id}
          />
          <AddTo
            className="items-center justify-center flex-1 w-full"
            pageType="productDetail"
            type="wishlist"
            productId={product._id}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
