import Hero from "@/components/Hero";
import { ProductsResponse } from "@/types";
import { useQuery } from "react-query";
import * as apiClient from "../api/api-client";
import Loading from "@/components/Loading";
// import PaginationSelector from "@/components/PaginationSelector";
import ProductCart from "@/components/ProductCart";

const Home = () => {
  const { data, isLoading } = useQuery<ProductsResponse>(
    "all",
    apiClient.getAllProducts,
    {
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) {
    return <Loading />;
  }
  if (!data) return <div>no data</div>;
  console.log("data", data);
  return (
    <main className="container flex flex-col gap-5 py-10 mx-auto">
      <Hero
        title="Most Popular Products
      "
        products={data!.products}
      />
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.products.map((product) => (
          <ProductCart key={product._id} product={product} />
        ))}
      </div>
      {/* <PaginationSelector
        page={data!.currentPage}
        pages={data!.totalPages}
        onPageChange={(page) => {
          apiClient.getAllProducts({ page });
        }}
      /> */}
    </main>
  );
};

export default Home;
