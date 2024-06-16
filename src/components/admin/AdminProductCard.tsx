import { ProductType } from "@/types";
import { Input } from "../ui/input";

type AdminProductCard = {
  product: ProductType[];
};

const AdminProductCard = ({ product }: AdminProductCard) => {
  return (
    <div className="flex flex-col gap-2">
      {product.map((product, index) => (
        <div
          key={product._id}
          className="flex items-center justify-between p-4 transition duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:shadow-red-200"
        >
          {index + 1}.
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
            <Input
              className="w-fit"
              type="number"
              value={product.price}
              disabled
            />
          </div>
          <div className="flex items-center gap-2">
            <p>In stock</p>
            <Input
              className="w-fit"
              type="number"
              value={product.countInStock}
              disabled
            />
          </div>
          <div>
            Category: <span>{product.category}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProductCard;
