/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/exhaustive-deps */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import {
  useCreatePaymentMutation,
  useCreateUserPayDataMutation,
} from "../../redux/features/payment/payment";
import { useGetAllCartQuery } from "../../redux/features/carts/carts";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

/* eslint-disable @typescript-eslint/no-explicit-any */
const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transctionId, setTransctionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const { data } = useGetAllCartQuery(undefined);
  const cartData = data?.data;
  // console.log(cartData);
  const user = useAppSelector(selectCurrentUser);
  // console.log(user?._id);

  const currentUserCart = cartData?.filter(
    (cart: any) => cart.userId == user?._id
  );
  const allCartId = currentUserCart?.map((item: any) => item?._id);
  // console.log("all cart", allCartId);

  let totalPrice = 0;
  for (let i = 0; i < currentUserCart?.length; i++) {
    totalPrice += currentUserCart[i]?.productId?.price;
  }
  // console.log(totalPrice); // Output: 80

  const [createPayment, {}] = useCreatePaymentMutation();
  const [createUserPayData, {}] = useCreateUserPayDataMutation();

  // console.log("res error", isError);
  const totalPriceObjet = { amount: totalPrice };

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await createPayment(totalPriceObjet).unwrap();
        // console.log("res data===>", res);
        setClientSecret(res as any);
        setClientSecret(res);
      } catch (error) {
        // console.error("Error creating payment:", error);
      }
    };

    fetchPayment();
  }, [totalPrice]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log("payment error", error);
      setError((error as any).message);
      setTransctionId("");
    } else {
      // console.log("payment method", paymentMethod);
      setError("");
      setTransctionId("");
    }
    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.name || "anonymous",
          },
        },
      });

    if (confirmError) {
      // console.log("confirm error");
    } else {
      // console.log("Pyment intent", paymentIntent);
      setTransctionId("");
      if (paymentIntent?.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransctionId(paymentIntent?.id);

        //now save the payment in the database
        const payment = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent?.id,
          cartId: allCartId,
          status: "pending",
        };

        const res = await createUserPayData(payment);
        console.log("user save data", res);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p>Total Amount: {totalPrice}</p>
      </div>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transctionId && (
        <p className="text-green-600">Transaction ID: {transctionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
