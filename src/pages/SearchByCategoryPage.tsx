import SearchByCategory from "@/components/SearchByCategory";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import * as apiClient from "../api/api-client";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";

const SearchByCategoryPage = () => {
  const { categories } = useAppContext();
  const { categoryId } = useParams<{ categoryId: string }>();
  const { data, isLoading } = useQuery(
    ["searchByCategory", categoryId],
    () => apiClient.getProductsByCategory(categoryId || ""),
    {
      enabled: !!categoryId,
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <SearchByCategory
        categories={categories}
        categoryId={categoryId}
        products={data!}
      />
    </div>
  );
};

export default SearchByCategoryPage;
