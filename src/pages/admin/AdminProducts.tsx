import { useQuery } from "react-query";
import * as apiClient from "../../api/api-client";
import Loading from "@/components/Loading";
import AdminProductCard from "@/components/admin/AdminProductCard";
import { ProductType } from "@/types";

const AdminProducts = () => {
  const { data, isLoading, error } = useQuery<ProductType[], Error>(
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

  if (!data || data.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div>
      <span className="justify-end w-full font-bold">
        Total Products: {data.length}
      </span>
      <AdminProductCard product={data} />
    </div>
  );
};

export default AdminProducts;
