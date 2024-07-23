import { ProductDetailPageData } from "@/types";
import { useQuery } from "react-query";
import * as apiClient from "../api/api-client";
import { useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import ProductDetail from "@/components/ProductDetail";
import Hero from "@/components/Hero";
import ProductReviewForm from "@/components/ProductReviewForm";
import { useEffect } from "react";
import ProductReviews from "@/components/ProductReviews";
import { useAppContext } from "@/context/AppContext";

const ProductDetailPage = () => {
  const { reviews, setProductId } = useAppContext();
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      setProductId(productId);
    }
  }, [productId, setProductId]);

  useEffect(() => {
    if (reviews) {
      console.log("reviews", reviews);
    }
  }, [reviews]);

  const { data, isLoading, error } = useQuery<ProductDetailPageData, Error>(
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

  return (
    <div className="flex flex-col gap-4">
      <ProductDetail product={data!.productDetail} />
      <div className="p-10 rounded-lg shadow-lg bg-gray-50">
        <span className="flex justify-end w-full">
          <ProductReviewForm productId={productId!} />
        </span>
        <ProductReviews reviews={reviews} />
      </div>

      {data?.simmilarProducts.length ? (
        <Hero
          products={data.simmilarProducts}
          title="From same category
        "
        />
      ) : null}
    </div>
  );
};

export default ProductDetailPage;
