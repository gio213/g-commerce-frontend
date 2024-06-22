import { ProductType } from "@/types";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useAppContext } from "@/context/AppContext";

type HeroProps = {
  products: ProductType[];
  title?: string;
};

const Hero = ({ products, title }: HeroProps) => {
  // Initialize the cart state from local storage
  const { showToast } = useAppContext();
  const [cart, setCart] = useState<ProductType[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductType) => {
    setCart((prevCart) => [...prevCart, product]);
    showToast({ message: "Product added to cart", type: "success" });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">{title}</h1>
      <div className="w-full p-4 space-x-4 carousel carousel-center rounded-box bg-customBlue">
        {products.map((product) => (
          <div className="relative carousel-item" key={product._id}>
            <Link to={`/product/detail/${product._id}`}>
              <img
                src={product.imagesUrls[0]}
                className="object-cover object-center h-full cursor-pointer rounded-box"
                alt="hero"
                width={300}
                height={200}
              />
              <div className="absolute flex p-1 bg-white rounded bottom-2 right-2">
                ლ{product.price}
              </div>
            </Link>
            <div className="absolute flex p-1 rounded bottom-2 left-2">
              <Button variant={"ghost"}>
                <ShoppingCartIcon
                  onClick={() => addToCart(product)}
                  color="green"
                />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
