import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OrderType } from "@/types";
import { motion } from "framer-motion";
import { CardElement } from "@stripe/react-stripe-js";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import Loading from "@/components/Loading";

type CheckOutFormProps = {
  onSubmit: (order: OrderType) => void;
  totalCost: number;
  firstName: string;
  lastName: string;
  email: string;
  paymentIntentId: string;
  clientSecret: string;
  buttonLoading?: boolean;
};

const CheckOutForm = ({
  onSubmit,
  totalCost,
  email,
  firstName,
  lastName,
  paymentIntentId,
  clientSecret,
  buttonLoading,
}: CheckOutFormProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderType>({
    defaultValues: {
      firstName,
      lastName,
      email,
      paymentIntentId,
      clientSecret,
    },
  });

  const stripe = useStripe();
  const elements = useElements();

  const handleFormSubmit = async (order: OrderType) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret as string, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });
    if (result.paymentIntent?.status === "succeeded") {
      onSubmit(order);
      reset();
    }
  };

  return (
    <div className="flex space-x-4">
      <motion.form
        onSubmit={handleSubmit(handleFormSubmit)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-4 space-y-4 text-center bg-white rounded-md shadow-md"
      >
        <div className="flex">
          <div className="flex-1 p-4 space-y-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0 }}
              className="text-2xl font-semibold"
            >
              Shipping Address
            </motion.span>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Input
                placeholder="First Name"
                {...register("firstName", {
                  required: "First Name is required",
                })}
                disabled
              />
              {errors.firstName && (
                <motion.span
                  className="text-red-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.firstName.message}
                </motion.span>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Input
                placeholder="Last Name"
                {...register("lastName", { required: "Last Name is required" })}
                disabled
              />
              {errors.lastName && (
                <motion.span
                  className="text-red-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.lastName.message}
                </motion.span>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Input
                placeholder="Email"
                type="email"
                {...register("email", { required: "Email is required" })}
                disabled
              />
              {errors.email && (
                <motion.span
                  className="text-red-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.email.message}
                </motion.span>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Input
                placeholder="Address"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <motion.span
                  className="text-red-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.address.message}
                </motion.span>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Input
                placeholder="Country"
                {...register("country", { required: "Country is required" })}
              />
              {errors.country && (
                <motion.span
                  className="text-red-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.country.message}
                </motion.span>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Input
                placeholder="City"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && (
                <motion.span
                  className="text-red-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.city.message}
                </motion.span>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Input
                placeholder="Postal Code"
                {...register("postalCode", {
                  required: "Postal code is required",
                })}
              />
              {errors.postalCode && (
                <motion.span
                  className="text-red-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.postalCode.message}
                </motion.span>
              )}
            </motion.div>
          </div>

          <div className="flex-1 p-4 space-y-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0 }}
              className="text-2xl font-semibold"
            >
              Order Summary
            </motion.span>
            <motion.div
              className="p-4 rounded-lg bg-customBlue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-lg font-bold ">
                Total Price:{" "}
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                }).format(totalCost)}
              </p>
              <p className="text-xs opacity-50">
                Includes all taxes and shipping charges
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-gray-100 rounded-lg shadow-inner"
            >
              <p className="text-lg">Payment Details:</p>
              <CardElement
                id="payment-element"
                className="p-2 text-sm border rounded-md"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-end"
            >
              {buttonLoading ? (
                <Loading />
              ) : (
                <Button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                  Pay Now
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default CheckOutForm;
