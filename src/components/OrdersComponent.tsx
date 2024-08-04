import { OrderData } from "@/types";
import { motion } from "framer-motion";
import { IoCheckmarkDone } from "react-icons/io5";
import { Link } from "react-router-dom";

type OrdersComponentProps = {
  orders: OrderData[] | undefined;
};

const OrdersComponent = ({ orders }: OrdersComponentProps) => {
  return (
    <div className="p-6 bg-gray-100 shadow-md rounded-xl">
      {orders?.map((order, orderIndex) => (
        <div
          key={orderIndex}
          className="flex flex-col justify-between p-4 mb-6 bg-white rounded-lg shadow-sm md:flex-row"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full mb-4 md:w-1/2 md:mb-0"
          >
            <span className="flex justify-between">
              <h2 className="mb-2 text-xl font-semibold">Ordered:</h2>
              <p className="text-gray-500">Ordered ID: {order._id}</p>
            </span>
            <ol className="pl-6 list-decimal">
              {order.products.map((product, productIndex) => (
                <li className="p-2 border-b last:border-0" key={productIndex}>
                  <Link to={`/product/detail/${product._id}`}>
                    <p className="truncate hover:text-blue-500 hover:cursor-pointer hover:underline">
                      {product.name}
                    </p>
                  </Link>
                  <p className="text-gray-600">{product.price} €</p>
                </li>
              ))}
            </ol>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 md:pl-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Delivering to:</h2>
              <p className="text-gray-500">
                Ordered at: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <p className="mb-1">
              <span className="font-semibold">Person:</span> {order.firstName}{" "}
              {order.lastName}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Email:</span> {order.email}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Country:</span> {order.country}
            </p>
            <p className="mb-1">
              <span className="font-semibold">City:</span> {order.city}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Address:</span> {order.address}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Postal Code:</span>{" "}
              {order.postalCode}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Order Total:</span>{" "}
              {order.totalPrice} €
            </p>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold">Payment status:</p>
              {order.isPaid ? (
                <IoCheckmarkDone className="text-green-500" size={24} />
              ) : (
                <p className="text-red-500">Not Paid</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <p className="font-semibold">Delivery status:</p>
              {order.isDelivered ? (
                <IoCheckmarkDone className="text-green-500" size={24} />
              ) : (
                <p className="text-red-500">Not Delivered</p>
              )}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default OrdersComponent;
