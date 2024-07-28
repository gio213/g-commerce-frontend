import { ProductType } from "@/types";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../../api-client";
import { useAppContext } from "@/context/AppContext";
import DeleteConfirmationDialog from "../AlertDialog";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

type AdminProductCard = {
  product: ProductType;
};

const AdminProductCard = ({ product }: AdminProductCard) => {
  const { showToast } = useAppContext();
  const { mutate: deleteProduct } = useMutation(
    "productDelete",
    apiClient.deleteProduct,
    {
      onSuccess: () => {
        showToast({ message: "Product Deleted!", type: "success" });
      },
      onError: () => {
        showToast({ message: "Product Not Deleted!", type: "error" });
      },
    }
  );

  const { mutate: updateProduct } = useMutation<
    ProductType,
    Error,
    { productId: string; productData: ProductType }
  >(
    ["productUpdate"],
    ({ productId, productData }) =>
      apiClient.updateProduct(productId, productData),
    {
      onSuccess: () => {
        showToast({ message: "Product Updated!", type: "success" });
      },
      onError: () => {
        showToast({ message: "Product Not Updated!", type: "error" });
      },
    }
  );

  const { register, handleSubmit } = useForm<ProductType>({
    defaultValues: product,
  });

  const onSubmit = handleSubmit((data: ProductType) => {
    updateProduct({
      productId: product._id,
      productData: data,
    });
  });

  return (
    <div className="flex flex-col gap-2">
      <div
        key={product._id}
        className="flex items-center justify-between p-4 transition duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-red-200"
      >
        <img
          width={50}
          height={50}
          src={product.imagesUrls[0]}
          alt={product.name}
          className="object-cover rounded-lg"
        />
        <div className="w-2/12">
          <Link to={`/product/detail/${product._id}`}>
            <p className="truncate hover:underline hover:text-blue-500 hover:cursor-pointer">
              {product.name}
            </p>
          </Link>
        </div>
        <form className="flex gap-2" onSubmit={onSubmit}>
          <div className="flex items-center gap-2">
            <p>Price</p>
            <Input
              className="w-fit"
              type="number"
              {...register("price", { valueAsNumber: true })}
            />
          </div>
          <div className="flex items-center gap-2">
            <p>In stock</p>
            <Input
              className="w-fit"
              type="number"
              {...register("countInStock", { valueAsNumber: true })}
            />
          </div>
          <button type="submit" className="hidden"></button>
        </form>
        <div className="w-20">
          Category: <span>{product.category}</span>
        </div>
        <div className="flex gap-1">
          <DeleteConfirmationDialog
            buttonText="Delete"
            onConfirm={() => deleteProduct(product._id)}
          />
          <Button
            onClick={onSubmit}
            className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
