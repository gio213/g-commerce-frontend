import { useQuery } from "react-query";
import * as apiClient from "../../../api-client";
import Loading from "@/components/Loading";
import AdminProductCard from "@/components/admin/AdminProductCard";
import { ProductsResponse } from "@/types";

const AdminProducts = () => {
  const { data, isLoading, error } = useQuery<ProductsResponse, Error>(
    "products",
    apiClient.getAllProducts,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    <Loading />;
  }

  if (error) {
    return <div>An error occurred</div>;
  }

  if (!data || data.products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div>
      <span className="justify-end w-full font-bold">
        Total Products: {data.products.length}
      </span>

      {data.products.map((product) => (
        <AdminProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default AdminProducts;
