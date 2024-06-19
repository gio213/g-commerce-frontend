import { ProductType } from "@/types";

type ProductDetailProps = {
  product: ProductType;
};
const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between p-4 transition duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:shadow-red-200">
        <img
          width={50}
          height={50}
          src={product.imagesUrls[0]}
          alt={product.name}
          className="object-cover rounded-lg"
        />
        <div className="w-2/12">
          <p className="truncate">{product.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <p>Price</p>
          <span>{product.price}</span>
        </div>
        <div className="flex items-center gap-2">
          <p>In stock</p>
          <span>{product.countInStock}</span>
        </div>
        <div>
          Category: <span>{product.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
