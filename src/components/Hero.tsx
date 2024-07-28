import { ProductType } from "@/types";
import { Link } from "react-router-dom";
import AddTo from "./AddTo";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

type HeroProps = {
  products: ProductType[];
  title?: string;
};

const Hero = ({ products, title }: HeroProps) => {
  const { addCartItem, addWishListItem } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-center">{title}</h1>
      <div className="flex w-full p-4 space-x-4 carousel carousel-center rounded-box bg-customBlue">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            className="relative carousel-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={`/product/detail/${product._id}`}>
              <img
                src={product.imagesUrls[0]}
                className="object-cover object-center h-full cursor-pointer rounded-box"
                alt="hero"
                width={300}
                height={200}
              />
              <div className="absolute flex p-1 bg-white rounded bottom-2 right-2">
                €{product.price}
              </div>
            </Link>
            <div className="absolute flex p-1 rounded bottom-2 left-2">
              <AddTo
                type="wishlist"
                productId={product._id}
                product={product}
                onAdd={() => addWishListItem(product)}
              />
              <AddTo
                type="cart"
                productId={product._id}
                product={product}
                onAdd={() => addCartItem(product)}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Hero;
