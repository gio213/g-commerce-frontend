import { useAppContext } from "@/context/AppContext";
import { ProductType } from "@/types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ShoppingCard = () => {
  const [cart, setCart] = useState<ProductType[]>([]);
  const { showToast } = useAppContext();

  useEffect(() => {
    const loadedCart = localStorage.getItem("cart");
    if (loadedCart) {
      setCart(JSON.parse(loadedCart));
    }
  }, []);

  const removeFromCart = (product: ProductType) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== product._id));
    localStorage.setItem(
      "cart",
      JSON.stringify(cart.filter((item) => item._id !== product._id))
    );
    showToast({ message: "Product removed from cart", type: "success" });
  };

  if (cart.length === 0) {
    return <h1 className="text-center">Your shopping cart is empty</h1>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-center">Shopping card</h1>
      <p className="text-center">Total Items{cart.length}</p>
      <div className="flex flex-col gap-4">
        {cart.map((product, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 transition duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-red-200"
          >
            {index + 1}.
            <img
              width={50}
              height={50}
              src={product.imagesUrls[0]}
              alt={product.name}
              className="object-cover rounded-lg"
            />
            <Link to={`/product/detail/${product._id}`}>
              <div className="w1/2">
                <p className=" hover:underline hover:text-blue-500 hover:cursor-pointer">
                  {product.name}
                </p>
              </div>
            </Link>
            <p>₾{product.price}</p>
            <button
              onClick={() => removeFromCart(product)}
              className="px-4 py-2 text-white bg-red-500 rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCard;
