import { ProductType } from "@/types";
import { Link } from "react-router-dom";
import AddTo from "./AddTo";
import { useAppContext } from "@/context/AppContext";

type HeroProps = {
  products: ProductType[];
  title?: string;
};

const Hero = ({ products, title }: HeroProps) => {
  const { addCartItem, setWishListItems, wishListItems } = useAppContext();

  const addToWishList = (product: ProductType) => {
    setWishListItems([...wishListItems, product]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">{title}</h1>
      <div className="flex w-full p-4 space-x-4 carousel carousel-center rounded-box bg-customBlue">
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
                €{product.price}
              </div>
            </Link>
            <div className="absolute flex p-1 rounded bottom-2 left-2">
              <AddTo
                type="wishlist"
                productId={product._id}
                product={product}
                onAdd={() => addToWishList(product)}
              />
              <AddTo
                type="cart"
                productId={product._id}
                product={product}
                onAdd={() => addCartItem(product)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
