import Hero from "@/components/Hero";
import { ProductsResponse } from "@/types";
import { useQuery } from "react-query";
import * as apiClient from "../api/api-client";
import Loading from "@/components/Loading";

const Home = () => {
  const { data, isLoading } = useQuery<ProductsResponse>(
    "all",
    apiClient.getAllProducts,
    {
      refetchOnWindowFocus: false,
    }
  );
  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="container flex-1 py-10 mx-auto">
      <Hero
        title="Most Popular Products
      "
        products={data!.products}
      />
    </main>
  );
};

export default Home;
