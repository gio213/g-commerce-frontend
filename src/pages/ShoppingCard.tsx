import { useAppContext } from "@/context/AppContext";
import { ProductType } from "@/types";
import { useQuery } from "react-query";
import * as apiClient from "@/api/api-client";
import Loading from "@/components/Loading";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type AggregatedProductType = ProductType & {
  count: number;
  totalPrice: number;
};

const ShoppingCard = () => {
  const { user } = useAppContext();

  const { data, isLoading } = useQuery<ProductType[]>(
    "cartItems",
    () => apiClient.getCartItems(),
    {
      enabled: !!user,
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!data || data.length === 0) {
    return <div>No items in cart</div>;
  }

  // Aggregate products by productId
  const aggregatedProducts: { [key: string]: AggregatedProductType } =
    data.reduce(
      (acc, product) => {
        const id = product.productId._id;
        if (!acc[id]) {
          acc[id] = {
            ...product,
            count: 1,
            totalPrice: product.productId.price,
          };
        } else {
          acc[id].count += 1;
          acc[id].totalPrice += product.productId.price;
        }
        return acc;
      },
      {} as { [key: string]: AggregatedProductType } // Cast the initial value to the correct type
    );

  return (
    <div className="flex flex-col">
      <h1 className="mb-4 text-2xl font-semibold text-center">Shopping Cart</h1>
      <h3 className="mb-2 text-lg font-semibold text-center">
        Unique Items in cart: {Object.keys(aggregatedProducts).length}
      </h3>

      {Object.values(aggregatedProducts).map((product, index) => (
        <div
          key={product.productId._id}
          className="flex items-center justify-between p-2 mb-2 bg-white rounded-lg shadow-md"
        >
          {index + 1}
          <img
            src={product.productId.imagesUrls[0]}
            alt="product image"
            width={50}
            height={50}
          />
          <div className="w-80">
            <Link to={`/product/detail/${product.productId._id}`}>
              <h1 className="font-semibold truncate cursor-pointer font-md text-md hover:underline hover:text-blue-500">
                {product.productId.name}
              </h1>
            </Link>
          </div>
          (x{product.count})
          <div className="flex items-center">
            <span className="font-semibold text-md">
              ${product.totalPrice.toFixed(2)}
            </span>
          </div>
          <Button className="px-2 py-1 text-white bg-red-500 rounded-md">
            Remove
          </Button>
        </div>
      ))}

      <div className="flex items-center justify-between p-2 mb-2 bg-white rounded-lg shadow-md">
        <h1 className="font-semibold text-md">Total</h1>
        <span className="font-semibold text-md">
          $
          {Object.values(aggregatedProducts)
            .reduce((acc, product) => acc + product.totalPrice, 0)
            .toFixed(2)}
        </span>
        <Button className="px-2 py-1 text-white bg-green-500 rounded-md">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCard;
