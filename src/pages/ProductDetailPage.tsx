import { ProductsResponse } from "@/types";
import { useQuery } from "react-query";
import * as apiClient from "../api/api-client";
import { useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import ProductDetail from "@/components/ProductDetail";
import Hero from "@/components/Hero";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { data, isLoading, error } = useQuery<ProductsResponse, Error>(
    ["product", productId],
    () => apiClient.getProductById(productId as string),
    {
      refetchOnWindowFocus: false,
    }
  );

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
  console.log(data);

  return (
    <>
      <ProductDetail product={data!.productDetail} />
      {data?.simmilarProducts.length ? (
        <Hero
          products={data.simmilarProducts}
          title="From same category
        "
        />
      ) : null}
    </>
  );
};

export default ProductDetailPage;
