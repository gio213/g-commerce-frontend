import { ProductType } from "@/types";
import { useQuery } from "react-query";
import * as apiClient from "../api/api-client";
import { useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import { CheckCheck, OctagonX } from "lucide-react";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { data, isLoading, error } = useQuery<ProductType, Error>(
    ["product", productId],
    () => apiClient.getProductById(productId as string),
    {
      refetchOnWindowFocus: false,
    }
  );
  console.log(data);
  if (isLoading) {
    return (
      <div className="items-center justify-center w-full h-full">
        <Loading />
      </div>
    );
  }
  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div className="flex items-center p-10">
      <div className="grid w-1/2 grid-cols-3">
        {/* <img
          src={data?.imagesUrls[0]}
          alt="product image"
          width={400}
          height={400}
          className="object-cover rounded-lg"
        /> */}
        {data?.imagesUrls.map((image) => (
          <img
            src={image}
            alt="product image"
            width={100}
            height={100}
            className="cursor-pointer"
          />
        ))}
      </div>
      <div className="flex flex-col items-center w-1/2">
        <h1 className="text-2xl font-bold">{data?.name}</h1>
        <p>{data?.description}</p>
        <p>Price: ${data?.price}</p>
        <p>Category: {data?.category}</p>
        {data!.countInStock > 0 ? (
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

export default ProductDetailPage;
