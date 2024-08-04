import { categoryType, ProductType } from "@/types";
import { motion } from "framer-motion";
import ProductCard from "./ProductCart";

type SearchByCategoryProps = {
  categoryId: string | undefined;
  products: ProductType[];
  categories: categoryType[];
};

const SearchByCategory = ({
  categoryId,
  products,
  categories,
}: SearchByCategoryProps) => {
  return (
    <div key={categoryId} className="min-h-screen p-6 rounded-lg bg-customBlue">
      {categories.map(
        (category) =>
          category._id === categoryId && (
            <span key={category._id} className="flex justify-end">
              <p>
                {products.length} Product Found in{" "}
                <span className="font-bold">{category.categoryName}</span>
              </p>
            </span>
          )
      )}
      <motion.div
        className="flex flex-wrap justify-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {products.map((product) => (
          <motion.div
            key={product._id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SearchByCategory;
