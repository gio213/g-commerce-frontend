import { useAppContext } from "@/context/AppContext";
import ActiveUsers from "./components/ActiveUsers";
import { useQuery } from "react-query";
import * as apiClient from "@/api/api-client";
import RevenueByMonth from "./components/RevenueByMonth";
import Loading from "@/components/Loading";

const AdminDashboard = () => {
  const { isLoggedin } = useAppContext();
  const {
    data: revenue,
    isLoading,
    error,
  } = useQuery("all-orders", apiClient.getAllOrders);

  console.log("revenue", revenue);
  console.log("isLoading", isLoading);
  console.log("error", error);

  const orders = revenue?.map((order) => {
    console.log("order", order);
    return {
      ...order,
      createdAt: new Date(order.createdAt).toISOString(),
    };
  });

  console.log("orders", orders);

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading orders</div>;

  return (
    <main className="flex flex-col items-center gap-4 p-4 ">
      <ActiveUsers isLoggedIn={isLoggedin} />
      {orders && <RevenueByMonth orders={orders} />}
    </main>
  );
};

export default AdminDashboard;
