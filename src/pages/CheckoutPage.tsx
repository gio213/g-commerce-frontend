import { useMutation } from "react-query";
import * as apiClient from "@/api/api-client";
import { useEffect } from "react";
import CheckOutForm from "@/forms/CheckOutForm";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/ErrorPage";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
const CheckoutPage = () => {
  const { user, isLoggedin, stripePromise, showToast, clearItems } =
    useAppContext();
  const navigate = useNavigate();

  const { mutate, data, isLoading, isError } = useMutation(
    apiClient.createPaymentIntent
  );

  const { mutate: checkout, isLoading: loading } = useMutation(
    "checkout",
    apiClient.checkout,
    {
      onSuccess: () => {
        clearItems();
        showToast({ message: "Order placed successfully", type: "success" });
        navigate("/");
      },
      onError: (error) => {
        console.error("Error placing order:", error);
        showToast({ message: "Error placing order", type: "error" });
      },
    }
  );

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage text="Error fetching payment intent" />;
  }

  return (
    <div>
      {isLoggedin && data && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: data.clientSecret,
          }}
        >
          <CheckOutForm
            buttonLoading={loading}
            clientSecret={data.clientSecret}
            paymentIntentId={data.paymentIntentId}
            onSubmit={(order) => {
              checkout(order);
            }}
            firstName={user?.firstName || ""}
            lastName={user?.lastName || ""}
            email={user?.email || ""}
            totalCost={data?.totalCost || 0}
          />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutPage;
