import { ProductType } from "@/types";
import { CheckCheck, OctagonX } from "lucide-react";

type ProductDetailProps = {
  product: ProductType;
};
const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <div className="flex items-center p-10">
      <div className="grid w-1/2 grid-cols-3">
        {product.imagesUrls.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="product image"
            width={100}
            height={100}
            className="cursor-pointer"
          />
        ))}
      </div>
      <div className="flex flex-col items-center w-1/2">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Category: {product.category}</p>
        {product.countInStock > 0 ? (
          <div className="flex gap-2">
            <p>In stock</p>
            <CheckCheck color="green" />
          </div>
        ) : (
          <div className="flex gap-2">
            <p>Out of stock</p>
            <OctagonX color="red" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
