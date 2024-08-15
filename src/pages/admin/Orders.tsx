import OrdersWithProps from "./components/OrdersWithProps";
import * as apiClient from "../../api/api-client";
import { useQuery } from "react-query";
import Loading from "@/components/Loading";
const Orders = () => {
  const { data: orders, isLoading } = useQuery(
    "all-orders",
    apiClient.getAllOrders
  );

  if (isLoading) return <Loading />;
  return (
    <div>
      <OrdersWithProps orders={orders!} />
    </div>
  );
};

export default Orders;
