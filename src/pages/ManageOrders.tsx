import OrdersComponent from "@/components/OrdersComponent";
import * as apiClient from "../api/api-client";
import { useQuery } from "react-query";
const ManageOrders = () => {
  const { data: orders } = useQuery("orders", apiClient.getOrders, {
    onError: (error) => {
      console.log(error);
    },
  });
  console.log("orders", orders);
  return (
    <div>
      <OrdersComponent orders={orders!} />
    </div>
  );
};

export default ManageOrders;
