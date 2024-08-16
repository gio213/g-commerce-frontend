import { ProductType } from "@/types";
import { Link } from "react-router-dom";
import AddTo from "./AddTo";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      <h1 className="text-2xl font-bold text-center font-noto">{title}</h1>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {products.map((product, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-2">
                <Card className="relative">
                  <CardContent className="flex items-center justify-center p-8 aspect-square">
                    <Link to={`/product/detail/${product._id}`}>
                      <img
                        src={product.imagesUrls[0]}
                        className="object-cover object-center w-full h-64 cursor-pointer sm:h-full rounded-box"
                        alt="hero"
                      />
                      <div className="absolute z-10 flex items-center justify-center p-1 bg-green-200 rounded-full shadow-lg bottom-2 right-2">
                        <span className="text-sm font-bold text-gray-800">
                          €{product.price}
                        </span>
                      </div>
                    </Link>
                    <div className="absolute z-10 flex p-1 rounded bottom-2 left-2">
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
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </motion.div>
  );
};

export default Hero;
