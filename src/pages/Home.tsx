import Hero from "@/components/Hero";
import { ProductsResponse } from "@/types";
import { useQuery } from "react-query";
import * as apiClient from "../api/api-client";
import Loading from "@/components/Loading";
import ProductCart from "@/components/ProductCart";
import { useEffect, useState } from "react";
import PaginationSelector from "@/components/PaginationSelector";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page") || "1", 10);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  // Fetching data with react-query, using currentPage as a dependency
  const { data, isLoading } = useQuery<ProductsResponse>(
    ["all", currentPage],
    () => apiClient.getPaginatedProducts({ page: currentPage }),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true, // to keep the previous data while fetching new data
    }
  );

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages);
    }
  }, [data]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data) return <div>No data</div>;

  return (
    <main className="container flex flex-col gap-5 py-10 mx-auto">
      <Hero title="Most Popular Products" products={data.products} />
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.products.map((product) => (
          <ProductCart key={product._id} product={product} />
        ))}
      </div>

      <PaginationSelector
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default Home;
