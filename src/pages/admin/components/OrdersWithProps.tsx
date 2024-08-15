import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderData } from "@/types";
import { Check } from "lucide-react";
import { GiCrossMark } from "react-icons/gi";

type OrdersWithPropsProps = {
  orders: OrderData[];
};

const OrdersWithProps = ({ orders }: OrdersWithPropsProps) => {
  return (
    <Table>
      <TableCaption>A list of your recent Ordres.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">OrderId</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total paid</TableHead>
          <TableHead>Delivered</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length > 0 ? (
          orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.firstName}</TableCell>
              <TableCell>{order.lastName}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{order.country}</TableCell>
              <TableCell>{order.city}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>
                {order.isPaid ? (
                  <Check color="green" />
                ) : (
                  <GiCrossMark color="red" />
                )}
              </TableCell>
              <TableCell>{order.totalPrice}</TableCell>
              <TableCell>
                {order.isDelivered ? (
                  <Check color="green" />
                ) : (
                  <GiCrossMark color="red" />
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4}>No orders found.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default OrdersWithProps;
