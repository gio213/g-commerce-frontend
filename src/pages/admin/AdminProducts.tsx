import { useQuery } from "react-query";
import * as apiClient from "../../api/api-client";
import Loading from "@/components/Loading";
import AdminProductCard from "@/components/admin/AdminProductCard";
import { ProductsResponse } from "@/types";
import PaginationSelector from "@/components/PaginationSelector";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminProducts = () => {
  // const { data, isLoading, error } = useQuery<ProductsResponse, Error>(
  //   "products",
  //   apiClient.getAllProducts,
  //   {
  //     refetchOnWindowFocus: false,
  //   }
  // );

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page") || "1", 10);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const { data, isLoading, error } = useQuery<ProductsResponse>(
    ["all", currentPage],
    () => apiClient.getPaginatedProducts({ page: currentPage }),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true, // to keep the previous data while fetching new data
    }
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };
  if (isLoading) {
    <Loading />;
  }

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages);
    }
  }, [data]);

  if (error) {
    return <div>An error occurred</div>;
  }

  if (!data || data.products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <span className="flex items-center justify-end w-full font-bold ">
        Total Products: {data.totalProducts}
      </span>

      {data.products.map((product) => (
        <AdminProductCard key={product._id} product={product} />
      ))}
      <PaginationSelector
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminProducts;
