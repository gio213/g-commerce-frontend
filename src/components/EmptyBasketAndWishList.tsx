import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import { GiNothingToSay } from "react-icons/gi";

type EmptyBasketAndWishListProps = {
  title: string;
};

const EmptyBasketAndWishList = ({ title }: EmptyBasketAndWishListProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-96">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {title === "Shopping Cart" ? (
          <FiShoppingCart className="text-6xl text-gray-700" />
        ) : (
          <GiNothingToSay className="text-6xl text-gray-700" />
        )}
      </motion.div>
      <motion.h1
        className="text-2xl font-bold text-center text-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
      >
        Your {title} is empty
      </motion.h1>
    </div>
  );
};

export default EmptyBasketAndWishList;
