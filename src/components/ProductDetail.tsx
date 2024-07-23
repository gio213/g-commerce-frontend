import { useState } from "react";
import { ProductType } from "@/types";
import { CheckCheck, OctagonX } from "lucide-react";
import AddTo from "./AddTo";
import { useAppContext } from "@/context/AppContext";

type ProductDetailProps = {
  product: ProductType;
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [selectedImage, setSelectedImage] = useState(product.imagesUrls[0]);
  const { addCartItem, addWishListItem } = useAppContext();
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="p-10 rounded-lg shadow-lg bg-gray-50">
      <div className="flex flex-col items-center gap-10 md:flex-row">
        <div className="flex justify-center flex-1">
          <img
            src={selectedImage}
            alt="Selected product"
            className={`cursor-pointer transition-transform duration-300 ${isZoomed ? "scale-125" : "scale-100"} rounded-lg shadow-xl`}
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-5">
          {product.imagesUrls.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`product image ${index + 1}`}
              className="object-cover w-full h-24 rounded-md cursor-pointer"
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
        <div className="flex flex-col items-start flex-1">
          <h1 className="mb-4 text-4xl font-bold">{product.name}</h1>
          <p className="mb-2 text-gray-700">{product.description}</p>
          <p className="mb-2 text-lg font-semibold">Price: ${product.price}</p>
          <p className="mb-4 text-gray-600">Category: {product.category}</p>
          {product.countInStock > 0 ? (
            <div className="flex items-center gap-2 mb-4 text-green-600">
              <p>In stock</p>
              <CheckCheck />
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-4 text-red-600">
              <p>Out of stock</p>
              <OctagonX />
            </div>
          )}
          <div className="flex gap-4">
            <AddTo
              product={product}
              type="cart"
              pageType="productDetail"
              productId={product._id}
              onAdd={() => addCartItem(product)}
            />
            <AddTo
              product={product}
              type="wishlist"
              pageType="productDetail"
              productId={product._id}
              onAdd={() => addWishListItem(product)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
